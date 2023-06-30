export default class ItemDoacao {
    itd_id: number | null;
    id_doacao: number;
    itd_nome: string;
    itd_quantidade: number;
    itd_categoria: string;
    itd_validade: string;

    constructor({ itd_id = null, id_doacao, itd_nome, itd_quantidade, itd_categoria, itd_validade }: ItemDoacao) {
        this.itd_id = itd_id;
        this.id_doacao = id_doacao;
        this.itd_nome = itd_nome;
        this.itd_quantidade = itd_quantidade;
        this.itd_categoria = itd_categoria;
        this.itd_validade = itd_validade;
    }
}