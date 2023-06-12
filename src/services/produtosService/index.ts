import api from "../api";

export const produtosService = {
    async getProdutos() {
        const res =await api.get('/produtos');
        if(res.status == 200)
            return res.data
        else
            return []    
    }
}