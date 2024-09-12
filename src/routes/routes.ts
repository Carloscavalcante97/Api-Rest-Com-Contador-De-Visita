import express from 'express';
import UsuarioController from '../controller/usuario.controller';

const routes = express();
const User = new UsuarioController();

routes.use(express.json());

routes.get('/usuario', User.get);
routes.get('/usuario/:identificador', User.getUserbyId);
routes.post('/usuario', User.cadastrar);
routes.put('/usuario', User.editar);
routes.delete('/usuario/:identificador', User.deletar);

export default routes;