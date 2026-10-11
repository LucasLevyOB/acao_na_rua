import connection from "./connection";

/**
 * IDs das ONGs cujos dados o usuário (administrador por e-mail, voluntário por CPF) pode ver.
 *
 * - Administrador: as ONGs que ele administra.
 * - Voluntário: as ONGs em que participa, mais as demais ONGs dos administradores dessas ONGs.
 *   Uma ONG sem administrador vinculado continua visível para os voluntários dela.
 */
const getOngIdsVisiveis = async (emailCpf: string): Promise<number[]> => {
    if (emailCpf.includes("@")) {
        const rows = await connection("administrador_ong")
            .distinct("administrador_ong.ong_id")
            .innerJoin("administradores", "administrador_ong.adm_id", "administradores.adm_id")
            .where({ "administradores.adm_email": emailCpf });
        return rows.map((row) => row.ong_id);
    }

    const ongsDoVoluntario = connection("participa").select("ong_id").where({ vol_cpf: emailCpf });
    const adminsDessasOngs = connection("administrador_ong").select("adm_id").whereIn("ong_id", ongsDoVoluntario);

    const rows = await connection("participa")
        .select("ong_id").where({ vol_cpf: emailCpf })
        .union(connection("administrador_ong").select("ong_id").whereIn("adm_id", adminsDessasOngs));
    return rows.map((row) => row.ong_id);
};

export default getOngIdsVisiveis;
