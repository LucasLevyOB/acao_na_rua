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

routes.post("/auth/login", auth.login);
routes.get("/auth/token", auth.token);
routes.post("/administradores", administradores.create);
routes.get("/ongs", ongs.get);

// rotas autenticadas

// rota ongs
routes.post("/ongs/:email", checkLogged, adminPermission, ongs.create);
routes.get("/ongs/:email", checkLogged, adminPermission, ongs.getByAdmin);
routes.get("/ongs/by-voluntario/:cpf", checkLogged, voluntarioPermission, ongs.getByVoluntario);

// rota voluntarios
routes.post("/voluntarios/:email", checkLogged, adminPermission, voluntarios.create);
routes.get("/voluntarios/:email", checkLogged, adminPermission, voluntarios.get);

// rota pessoas_situacao_rua
routes.get("/pessoas_situacao_rua/:email_cpf", checkLogged, voluntarioPermission, pessoa_situacao_rua.get);
routes.post("/pessoas_situacao_rua/:email_cpf", checkLogged, voluntarioPermission, pessoa_situacao_rua.create);

// rota doacoes
routes.get("/doacoes/:email_cpf", checkLogged, voluntarioPermission, doacoes.get);
routes.post("/doacoes/:email_cpf", checkLogged, voluntarioPermission, doacoes.create);

// rota itens doacoes, o create ja esta na rota de doacoes
routes.get("/itens_doacoes/:email_cpf", checkLogged, voluntarioPermission, itens_doacoes.get);
routes.delete("/itens_doacoes/:email_cpf/:itd_id", checkLogged, voluntarioPermission, itens_doacoes.deleteItemDoacao);
routes.put("/itens_doacoes/:email_cpf/:itd_id", checkLogged, voluntarioPermission, itens_doacoes.update);

// rota ajudas
routes.get("/ajudas/:email_cpf", checkLogged, voluntarioPermission, ajudas.get);
routes.post("/ajudas/:email_cpf", checkLogged, voluntarioPermission, ajudas.create);
routes.delete("/ajudas/:email_cpf/:ajd_id", checkLogged, voluntarioPermission, ajudas.deleteAjuda);
routes.put("/ajudas/:email_cpf/:ajd_id", checkLogged, voluntarioPermission, ajudas.update);

export default routes;