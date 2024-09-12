import fs from 'fs/promises';
import Link from '../models/link.models';

export async function lerBanco(path:string): Promise<Link[]>{
    const dados = await fs.readFile(path);
    const parseDados = JSON.parse(dados.toString());
    return parseDados
}
export async function cadastrarNoBanco(link: Link[], path: string){
    const dados = await lerBanco(path);
    await fs.writeFile(path, JSON.stringify(link,null,"\t"));
}
export async function contarVisitas(identificador:string){
    const dados = await lerBanco('src/bancoDeDados.json');
    const link = dados.find((link: Link) => link.identificador === identificador);
    const linkComVisitas: Link = {
        identificador: link!.identificador,
        url: link!.url,
        visitas: link!.visitas + 1
    } 
    const dadosIndice = dados.findIndex((link: Link) => link.identificador === identificador);
    dados.splice(dadosIndice, 1, linkComVisitas);
    await fs.writeFile('src/bancoDeDados.json', JSON.stringify(dados, null, "\t"));
}