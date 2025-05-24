//por id del usuario
export interface GetTransaccionesUlimaMeta {
    msg:           string;
    transacciones: Transaccion[];
}

export interface Transaccion {
    _id:                 string;
    meta_vinculada:      string;
    monto:               number;
    tipo_transaccion:    string;
    p_balance_historico: number;
    p_balance_meta:      number;
    createdAt:           Date;
    updatedAt:           Date;
    __v:                 number;
}
