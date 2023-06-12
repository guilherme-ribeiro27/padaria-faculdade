import api from "../api";

export const categoriaService = {
    async getCategorias(){
        const res = await api.get("/categorias")
        if(res.status == 200)
            return res.data
        else 
            return []
    }
}