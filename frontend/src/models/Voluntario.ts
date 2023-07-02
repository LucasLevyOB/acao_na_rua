export default class Voluntario {
    vol_cpf: string;
    vol_nome: string;
    id_role: number;
    vol_senha: string;
    vol_setor: string;
    vol_data_entrada: Date;
    vol_data_saida: Date | null;
    ong_nome: string;

    constructor({ vol_cpf, vol_nome, id_role, vol_senha, vol_setor, vol_data_entrada, vol_data_saida = null, ong_nome }: Voluntario) {
        this.vol_cpf = vol_cpf;
        this.id_role = id_role;
        this.vol_nome = vol_nome;
        this.vol_senha = vol_senha;
        this.vol_setor = vol_setor;
        this.vol_data_entrada = vol_data_entrada;
        this.vol_data_saida = vol_data_saida;
        this.ong_nome = ong_nome;
    }
};