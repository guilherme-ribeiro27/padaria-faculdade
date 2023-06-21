import { Produto } from "@/app/menu/page"
import { faX,faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type props = {
    produtos: Produto[];
    isOpen: boolean;
    toggle: ()=>void;
}
export default function ModalCarrinho({produtos,isOpen,toggle}: props){
    console.log(produtos)
    return (
        <>
            {
                isOpen && (
                    <>
                        <div className="absolute w-1/2  top-1/4 left-1/4 right-1/2 bottom-1/2 z-10 bg-fundo/95 shadow-[0_0px_0px_#fdba74,0_4px_0px_0px_#fdba74] flex flex-col rounded-3xl pt-5">
                            <FontAwesomeIcon icon={faX} className="text-zinc-500 absolute right-7 top-5 cursor-pointer" onClick={toggle}/>
                            <div className="w-full h-1/5 flex flex-col justify-center items-center">
                                <p className="text-zinc-500 text-2xl">Carrinho</p>
                            </div>
                            <div className="flex flex-col flex-grow justify-center items-center">
                                {
                                    produtos.length > 0 ? produtos.map((produto)=>(
                                        <>
                                            <div key={produto.id} className="flex flex-row items-center w-3/4 shadow-slate-400 shadow-md">
                                                <img src={produto.img} alt="imgproduto" className="w-20 h-20 rounded-xl"/>
                                                <div className="flex flex-col ml-4">
                                                    <h1 className="text-zinc-500 text-base font-bold">{produto.nome}</h1>
                                                    <h1 className="text-zinc-500 text-lg">R$ {produto.preco.toString().replace('.',',')}</h1>
                                                </div>
                                                <FontAwesomeIcon icon={faTrash} className="text-zinc-500 text-2xl cursor-pointer flex-grow"/>
                                            </div>
                                        </>
                                    )):(<><div className="flex justify-center items-center h-full text-zinc-500 text-2xl">Carrinho vazio</div></>)
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}