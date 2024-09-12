import { Request, Response } from "express";
import Link from "../models/link.models";
import { cadastrarNoBanco, contarVisitas, lerBanco } from "../service/usuario.service";

const BD_PATH = "src/bancoDeDados.json";
interface User {
  identificador: string;
  url: string;
}
class UsuarioController {
  
  async get(req: Request, res: Response) {
    const dados = await lerBanco(BD_PATH);
    return res.json(dados).status(200);
  }

  async getUserbyId(req: Request, res: Response) {
    const identificador = req.params.identificador;
    const dados = await lerBanco(BD_PATH);
    const findUser = dados.find(
      (user: User) => user.identificador === identificador
    );
    if(!findUser){
    return res.status(404).json({ message: "Usuario não encontrado" })};
    await contarVisitas(findUser.identificador);
    return res.status(200).json(findUser);
  }

  async cadastrar(req: Request, res: Response) {
    const { identificador, url } = req.body;
    const dados = await lerBanco(BD_PATH);
    const novoLink = new Link( identificador, url);
    dados.push(novoLink);
    await cadastrarNoBanco(dados, BD_PATH);
    return res.status(201).json(novoLink);
  }

  async editar(req: Request, res: Response) {
    const { identificador, url } = req.body;
    const dados = await lerBanco(BD_PATH);
    const findUser = dados.find((user: User) => user.url === url);
    if (!findUser) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }
    findUser.identificador = identificador;
    await cadastrarNoBanco(dados, BD_PATH);
    return res.status(200).json(findUser);
  }

  async deletar(req: Request, res: Response) {
    const { identificador } = req.params;
    const dados = await lerBanco(BD_PATH);
    const userIndex = dados.findIndex(
      (user: User) => user.identificador === identificador
    );
    if (userIndex === -1) { 
      return res.status(404).json({ message: "Usuario não encontrado" });
    }
    dados.splice(userIndex, 1);
    await cadastrarNoBanco(dados, BD_PATH);

    return res.status(201).json({ message: "Usuario deletado com sucesso" });
  }
}
export default UsuarioController;
