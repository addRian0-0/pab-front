import { api } from "./axios"

export const transaccionesUltimaMetaIDUser = () => { return api.post(`/transaccion/all/${localStorage.getItem("id")}`) };