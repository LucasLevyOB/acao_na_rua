import express from "express";

const routes = express.Router();

import administradores from "./controllers/administradores";
import auth from "./controllers/auth";
import ongs from "./controllers/ongs";
import voluntarios from "./controllers/voluntarios";
import pessoa_situacao_rua from "./controllers/pessoa_situacao_rua";
import doacoes from "./controllers/doacoes";
import ajudas from "./controllers/ajudas";
import itens_doacoes from "./controllers/itens_doacoes";

import { checkLogged, adminPermission, voluntarioPermission } from "./middlewares";

routes.post("/login", auth.login);
routes.get("/token", auth.token);
routes.post("/administradores", administradores.create);
routes.get("/ongs", ongs.get);

// rotas autenticadas

// rota ongs
routes.post("/ongs/:email", checkLogged, adminPermission, ongs.create);

// rota voluntarios
routes.post("/voluntarios/:email", checkLogged, adminPermission, voluntarios.create);
routes.get("/voluntarios:email", checkLogged, adminPermission, voluntarios.get);

// rota pessoas_situacao_rua
routes.get("/pessoas_situacao_rua/:email", checkLogged, voluntarioPermission, pessoa_situacao_rua.get);
routes.post("/pessoas_situacao_rua/:email", checkLogged, voluntarioPermission, pessoa_situacao_rua.create);

// rota doacoes
routes.get("/doacoes/:email", checkLogged, voluntarioPermission, doacoes.get);
routes.post("/doacoes/:email", checkLogged, voluntarioPermission, doacoes.create);

// rota itens doacoes, o create ja esta na rota de doacoes
routes.get("/itens_doacoes/:email", checkLogged, voluntarioPermission, itens_doacoes.get);
routes.delete("/itens_doacoes/:email/:itd_id", checkLogged, voluntarioPermission, itens_doacoes.deleteItemDoacao);
routes.put("/itens_doacoes/:email/:itd_id", checkLogged, voluntarioPermission, itens_doacoes.update);

// rota ajudas
routes.get("/ajudas/:email", checkLogged, voluntarioPermission, ajudas.get);
routes.post("/ajudas/:email", checkLogged, voluntarioPermission, ajudas.create);
routes.delete("/ajudas/:email/:ajd_id", checkLogged, voluntarioPermission, ajudas.deleteAjuda);
routes.put("/ajudas/:email/:ajd_id", checkLogged, voluntarioPermission, ajudas.update);

export default routes;