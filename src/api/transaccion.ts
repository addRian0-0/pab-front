import { api } from "./axios"

export const transaccionesUltimaMetaIDUser = () => { return api.post(`/transaccion/all/${localStorage.getItem("id")}`) };

export const agregarTransaccion = (data: { monto: number, tipo_transaccion: string }) => {
    const { monto, tipo_transaccion } = data;

    return api.post("/transaccion/agregar", {
        monto,
        tipo_transaccion: tipo_transaccion === "Ganancia" ? "GANANCIA" : "DEPOSITO",
        id: localStorage.getItem("id"),
    });
}
