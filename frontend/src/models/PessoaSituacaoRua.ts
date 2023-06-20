export default class PessoaSituacaoRua {
    pes_id: number;
    pes_nome: string;
    pes_data_nasc: Date;
    pes_sexo: number;

    constructor({ pes_id, pes_nome, pes_data_nasc, pes_sexo }: PessoaSituacaoRua) {
        this.pes_id = pes_id;
        this.pes_nome = pes_nome;
        this.pes_data_nasc = pes_data_nasc;
        this.pes_sexo = pes_sexo;
    }
}