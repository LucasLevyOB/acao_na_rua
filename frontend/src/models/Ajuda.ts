export default class Ajuda {
    ajd_id: number | null;
    ong_id: number;
    pes_id: number;
    itd_id: number;
    ajd_qtde_item: number;
    ajd_data: Date;

    constructor({ ajd_id = null, ong_id, pes_id, itd_id, ajd_qtde_item, ajd_data }: Ajuda) {
        this.ajd_id = ajd_id;
        this.ong_id = ong_id;
        this.pes_id = pes_id;
        this.itd_id = itd_id;
        this.ajd_qtde_item = ajd_qtde_item;
        this.ajd_data = ajd_data;
    }
}