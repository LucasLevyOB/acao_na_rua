export default class Role {
    rol_id: number;
    rol_nome: string;

    constructor({ rol_id, rol_nome }: Role) {
        this.rol_id = rol_id;
        this.rol_nome = rol_nome;
    }
}
