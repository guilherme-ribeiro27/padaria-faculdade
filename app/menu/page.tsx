'use client'
import HeaderMenu  from "@/components/HeaderMenu"
import { useEffect, useState } from "react";
import { categoriaService } from "@/src/services/categoriasService";
import { produtosService } from "@/src/services/produtosService";
import HeadComponent from "@/components/Head"
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
type Categoria = {
    id: number;
    nome: string;
}
type Produto = {
    id: number;
    nome: string;
    // descricao: string;
    preco: number;
    categoria: number;
    imagem: string;
}
export default function HomeProdutos(){
    const [categorias, setCategorias] = useState<Categoria[]>([{id: 9999, nome: "Todos os produtos"}])
    const [selectedCategory, setSelectedCategory] = useState<Categoria | undefined>({id: 9999, nome: "Todos os produtos"} as Categoria)
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(()=>{
        getCategorias();
        getProdutos();
    },[])
    const getCategorias = async ()=>{
        const categoriasGet = await categoriaService.getCategorias();
        setCategorias(categoriasGet);
    }
    const getProdutos = async ()=>{
        const produtosGet = await produtosService.getProdutos();
        setProdutos(produtosGet);
    }
    const handleCategoryClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
        const selectedCategory = categorias.find((categoria)=>categoria.nome === String(event.currentTarget.innerText))
        setSelectedCategory(selectedCategory);
        //arrumar isso
        setProdutos(produtos.filter((produto)=>produto.categoria === selectedCategory?.id))
    }
    return (
        <>
            <Head>
                <title >Padaria Faculdade | Produtos</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <HeaderMenu/>
            <div className="flex flex-row justify-between mx-[15%] mt-12">
                <div className="flex flex-row gap-5">
                    <label htmlFor="search" className="text-zinc-500 text-xl">Buscar:</label>
                    <input type="search" name="search" id="search" className="border-zinc-500 border rounded-md focus-visible:border-zinc-500"/>
                </div>
                <h1 className="text-zinc-500 text-xl font-bold ml-6">{selectedCategory!.nome}</h1>
                <p className="text-zinc-500 text-xl">
                    <FontAwesomeIcon icon={faCartShopping}/>
                    Carrinho
                </p>
            </div>
            <main className="flex flex-row h-full mx-[15%] mt-12">
                <aside className="w-1/5 h-full  shadow-slate-400 shadow-2xl rounded-xl">
                    <div className="categorias mt-8 ml-10 pb-8">
                        <h1 className="text-zinc-500 text-xl font-bold mb-5">Categorias</h1>
                        <ul className="flex flex-col items-start gap-4">
                            {categorias.length > 0 ? categorias.map((categoria)=>(
                                <a key={categoria.id} className="text-zinc-500 text-lg mb-2 border-b w-full hover:cursor-pointer hover:text-zinc-300" onClick={handleCategoryClick}>{categoria.nome}</a>
                            )): <li className="text-zinc-500 text-lg">Nenhuma categoria cadastrada</li>}
                        </ul>
                    </div>
                </aside>
                <div className="w-[80%] h-full flex flex-col gap-5">
                    
                    <div className="flex flex-row w-full flex-wrap gap-x-[1.6rem] gap-y-8">
                        {produtos.length > 0 ? produtos.map((produto)=>(
                            <div key={produto.id} className="flex flex-row items-center justify-between w-[45%] ml-6 py-2 shadow-slate-400 shadow-md p-6 rounded-2xl">
                                <div className="flex flex-rox items-center">
                                    <img src={produto.imagem} className="w-20 h-20 rounded-xl"/>
                                    <div className="flex flex-col ml-4">
                                        <h1 className="text-zinc-500 text-base font-bold">{produto.nome}</h1>
                                        <h1 className="text-zinc-500 text-lg">R$ {produto.preco.toString().replace('.',',')}</h1>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <button className="bg-zinc-500 text-white font-bold rounded-xl px-4 py-2">Adicionar</button>
                                </div>
                            </div>
                        )): <h1 className="text-zinc-500 text-lg text-center">Nenhum produto cadastrado</h1>}
                    </div>
                </div>
            </main>
        </>
    )
}