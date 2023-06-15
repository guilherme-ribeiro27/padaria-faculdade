import { Produto } from "@/app/menu/page";

type props= {
    produto: Produto | undefined;
    isOpen: boolean;
    toggle: ()=>void;
}
export default function ModalProduto({produto,isOpen,toggle}: props){
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{

    }
    return (
        <>
            {   
                isOpen && (
                    <>
                    <div className="z-10 w-full h-full absolute flex justify-center items-center bg-red-400" onClick={toggle}>
                        <div className="w-full h-[500px] flex justify-center items-center inset-0 outline-none focus:outline-none bg-black">
oi
                        </div>
                    </div>
                    </>
                )
            }
        </>

    )
}