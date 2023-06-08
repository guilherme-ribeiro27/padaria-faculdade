import api from "../api";

type Cliente = {
    nome: string;
    cpf: string,
    telefone: string,
}
export const userService = {
    async register (usuario: Cliente) {
        const res = await api.post("/clientes",usuario)
        return res.data
    },
    async login (usuario: Cliente) {}
}