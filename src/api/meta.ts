import { api } from "./axios";

export const getUltimaMeta = () => { return api.get(`/meta/ultima-meta/${localStorage.getItem("id")}`); } 