'use client'
import HeaderMenu  from "@/components/HeaderMenu"
import { useEffect, useState } from "react";
import { categoriaService } from "@/src/services/categoriasService";

type Categoria = {
    id: number;
    nome: string;
}
export default function HomeProdutos(){
    const [categorias, setCategorias] = useState<Categoria[]>([])

    useEffect(()=>{
        getCategorias();
    },[])
    const getCategorias = async ()=>{
        const categorias = await categoriaService.getCategorias();
        setCategorias(categorias);
    }
    return (
        <>
            <HeaderMenu/>
            <main className="flex flex-row h-full mx-[20%] mt-12">
                <aside className="w-1/5 h-full  shadow-slate-400 shadow-2xl rounded-xl">
                    <div className="categorias mt-8 ml-10">
                        <h1 className="text-zinc-500">Categorias</h1>
                        <ul className="flex flex-col items-start">
                            {categorias.length > 0 ? categorias.map((categoria)=>(
                                <li key={categoria.id} className="text-zinc-500 text-lg">{categoria.nome}</li>
                            )): <li className="text-zinc-500 text-lg">Nenhuma categoria cadastrada</li>}
                        </ul>
                    </div>
                </aside>
                <div></div>
            </main>
        </>
    )
}