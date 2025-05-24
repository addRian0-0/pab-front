import { api } from "./axios";

export const accesoUsuario = (data: { username: string, pass: string }) => {
    return api.post("/usuario/acceder", data);
}