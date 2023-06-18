export default class Ong {
    ong_id: number;
    ong_nome: string;
    ong_razao_social: string;

    constructor({ ong_id, ong_nome, ong_razao_social }: Ong) {
        this.ong_id = ong_id;
        this.ong_nome = ong_nome;
        this.ong_razao_social = ong_razao_social;
    }
}