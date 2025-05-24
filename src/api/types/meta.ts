export interface Main {
    msg:        string;
    ultimaMeta: UltimaMeta;
}

export interface UltimaMeta {
    _id:                string;
    estatus:            string;
    tiempo_limite:      number;
    fecha_limite:       Date;
    balance_bank:       number;
    meta_multiplicador: number;
    meta:               number;
    meta_diaria:        number;
    meta_cubierta:      number;
    usuario_vinculado:  string;
    depositos_totales:  number;
    ganancias_totales:  number;
    createdAt:          Date;
    updatedAt:          Date;
    __v:                number;
}
