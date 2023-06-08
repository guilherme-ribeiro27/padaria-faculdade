import Link from "next/link"


export default function Header (){
    return (    
        <>
            <div className="flex justify-between px-16 py-10 text-xl shadow-slate-400 shadow-md">
                <div className="text-zinc-500">
                    <Link href='/'>Padaria Santo Pão</Link>
                </div>
                <div className="flex gap-8 text-zinc-500">
                    <Link href='/pedidos'>Pedidos</Link>
                    <Link href='/relatorios'>Relatorios</Link>
                    <Link href='/registroCliente'>Cadastro de clientes</Link>
                </div>
            </div>
        </>
    )
}