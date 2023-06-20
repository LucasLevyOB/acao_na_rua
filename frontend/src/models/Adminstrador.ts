export default class Administrador {
    adm_id: number;
    adm_nome: string;
    id_role: number;
    adm_email: string;
    adm_senha: string;
    adm_role: number;

    constructor({ adm_id, adm_nome, id_role, adm_email, adm_senha, adm_role }: Administrador) {
        this.adm_id = adm_id;
        this.id_role = id_role;
        this.adm_nome = adm_nome;
        this.adm_email = adm_email;
        this.adm_senha = adm_senha;
        this.adm_role = adm_role;
    }
}