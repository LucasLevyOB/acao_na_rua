export default class Doacao {
    id_doacao: number;
    ong_id: number;
    doa_cpfcnpj: string;
    doa_nome: string;
    doa_data: Date;

    constructor({ id_doacao, ong_id, doa_cpfcnpj, doa_nome, doa_data }: Doacao) {
        this.id_doacao = id_doacao;
        this.ong_id = ong_id;
        this.doa_cpfcnpj = doa_cpfcnpj;
        this.doa_nome = doa_nome;
        this.doa_data = doa_data;
    }
}