import Link from "next/link";

export default function HeaderMenu(){
    return(
        <>
        <div className="flex justify-center items-center w-screen py-10 text-xl shadow-slate-400 shadow-md">
            <div className="text-zinc-500">
                <Link href='/'>Padaria Santo Pão</Link>
            </div>
        </div>
    </>
    )
    
}