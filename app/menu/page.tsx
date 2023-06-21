'use client'
import HeaderMenu  from "@/components/HeaderMenu"
import { useEffect, useState } from "react";
import { categoriaService } from "@/src/services/categoriasService";
import { produtosService } from "@/src/services/produtosService";
import HeadComponent from "@/components/Head"
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import ModalProduto from "@/components/ModalProduto";
import ModalCarrinho from "@/components/ModalCarrinho";
type Categoria = {
    id: number;
    nome: string;
}
export type Produto = {
    id: number;
    nome: string;
    preco: number;
    categoria: number;
    img: string;
}
export default function HomeProdutos(){
    const [categorias, setCategorias] = useState<Categoria[]>([{id: 9999, nome: "Todos os produtos"}])
    const [selectedCategory, setSelectedCategory] = useState<Categoria | undefined>({id: 9999, nome: "Todos os produtos"} as Categoria)
    
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtosFiltered, setProdutosFiltered] = useState<Produto[]>([]);
    const [produtoModal, setProdutoModal] = useState<Produto | undefined>({} as Produto);
    const [showProdutoModal, setShowProdutoModal] = useState<boolean>(false);

    const [showCarrinhoModal, setShowCarrinhoModal] = useState<boolean>(false);
    const [produtosCarrinho, setProdutosCarrinho] = useState<Produto[]>([]);
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
        setProdutosFiltered(produtosGet)
    }
    const handleCategoryClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
        const selectedCategory = categorias.find((categoria)=>categoria.nome === String(event.currentTarget.innerText))
        setSelectedCategory(selectedCategory);
        setProdutosFiltered(produtos.filter((produto)=>produto.categoria === selectedCategory?.id))
    }
    const handleProdutoModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        setProdutoModal(produtos.find((produto)=>produto.id === Number(event.currentTarget.dataset.produtoId)));
        setShowProdutoModal(true);
    }
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        setShowProdutoModal(false);
    }
    const toggleProdutoModal = ()=>setShowProdutoModal(!showProdutoModal)

    const handleCarrinho = (event: React.MouseEvent<HTMLParagraphElement,MouseEvent>)=>setShowCarrinhoModal(!showCarrinhoModal)
    const toggleCarrinhoModal = ()=> setShowCarrinhoModal(!showCarrinhoModal)

    const handleAdicionarCarrinho = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        const id = Number(event.currentTarget.id);
        produtosCarrinho.push(produtos.find((produto)=>produto.id === id)!)
    }
    return (
        <>
            <Head>
                <title >Padaria Faculdade | Produtos</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            {showProdutoModal && (
                <>
                    <ModalProduto produto={produtoModal} isOpen={showProdutoModal} toggle={toggleProdutoModal}/>
                </>
            )}
            {
                showCarrinhoModal && (
                    <ModalCarrinho produtos={produtosCarrinho} isOpen={showCarrinhoModal} toggle={toggleCarrinhoModal}/>
                )
            }
            <HeaderMenu/>
            <main className="absolute z-0 bg-fundo">
                <div className="flex flex-row justify-between mx-[15%] mt-12">
                    <div className="flex flex-row gap-5">
                        <label htmlFor="search" className="text-clarinho text-xl">Buscar:</label>
                        <input type="search" name="search" id="search" className="border-zinc-500 border rounded-md focus-visible:border-zinc-500 bg-fundoEscuro"/>
                    </div>
                    <h1 className="text-clarinho text-xl font-bold ml-6">{selectedCategory!.nome}</h1>
                    <p className="text-clarinho text-xl hover:cursor-pointer" onClick={handleCarrinho}>
                        <FontAwesomeIcon icon={faCartShopping}/>
                        Carrinho
                    </p>
                </div>
                <main className="flex flex-row h-full mx-[15%] mt-12 gap-6">
                    <aside className="w-1/5 h-full">
                        <div className="categorias mt-8 pb-8">
                            <h1 className="text-clarinho text-xl font-bold mb-5">Categorias</h1>
                            <ul className="flex flex-col items-start gap-4">
                                {categorias.length > 0 ? categorias.map((categoria)=>(
                                    <a key={categoria.id} className="text-clarinho text-lg mb-2 border-b w-full hover:cursor-pointer hover:text-zinc-300 shadow-[0_1px_0_#fdba74]" onClick={handleCategoryClick}>{categoria.nome}</a>
                                )): <li className="text-clarinho text-lg">Nenhuma categoria cadastrada</li>}
                            </ul>
                        </div>
                    </aside>
                    <div className="w-[80%] h-full flex flex-col gap-5">
                        <div className="flex flex-row w-full flex-wrap gap-x-[1.6rem] gap-y-8">
                            {produtosFiltered.length > 0 ? produtosFiltered.map((produto)=>(
                                <div key={produto.id} className="flex flex-row items-center justify-between w-[45%] ml-6 py-2 shadow-orange-300 shadow-md p-6 rounded-2xl bg-fundoEscuro">
                                    <div className="flex flex-row items-center">
                                        <img src={produto.img} className="w-20 h-20 rounded-xl"/>
                                        <div className="flex flex-col ml-4">
                                            <h1 className="text-clarinho text-base font-bold">{produto.nome}</h1>
                                            <h1 className="text-clarinho text-lg">R$ {produto.preco.toString().replace('.',',')}</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <button id={produto.id.toString()} className="bg-zinc-500 text-white font-bold rounded-xl px-4 py-2 cursor-pointer z-10"  onClick={handleAdicionarCarrinho}>Adicionar</button>
                                    </div>
                                </div>
                            )): <h1 className="text-clarinho text-lg text-center">Nenhum produto cadastrado</h1>}
                        </div>
                    </div>

                </main>
            </main>
        </>
    )
}