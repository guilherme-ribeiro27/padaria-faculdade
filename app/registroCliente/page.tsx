'use client'
import { userService } from "@/src/services/userService";
import { FormEvent } from "react";

export default function RegistroCliente() {
    const handleRegister = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const nome = event.currentTarget.nome.value;
        const cpf = event.currentTarget.cpf.value;
        const telefone = event.currentTarget.telefone.value;

        await userService.register({nome, cpf, telefone});
        event.currentTarget.reset()
    }
    return (
        <>
            <main className="w-full h-screen flex items-center justify-center text-2xl bg-opacity-30" style={{backgroundColor: 'rgba(255, 255, 255, 0.961'}}>
                <form className="shadow-slate-400 shadow-2xl flex flex-col items-center" onSubmit={handleRegister}>
                    <h1 className="text-zinc-500 py-7">Registro de cliente</h1>
                    <div className="input-group flex flex-col items-start px-20 pb-10 gap-1">
                        <label htmlFor="nome" className="text-zinc-500">Nome</label>
                        <input type="text" name="nome" id="nome" className="bg-opacity-5 bg-black rounded-md p-3 text-black text-opacity-70 text-lg"/>
                    </div>
                    <div className="input-group flex flex-col items-start px-20 pb-10 gap-1">
                        <label htmlFor="cpf" className="text-zinc-500">CPF</label>
                        <input type="text" name="cpf" id="cpf" className="bg-opacity-5 bg-black rounded-md p-3 text-black text-opacity-70 text-lg"/>
                    </div>
                    <div className="input-group flex flex-col items-start px-20 pb-10 gap-1">
                        <label htmlFor="telefone" className="text-zinc-500">Telefone</label>
                        <input type="text" name="telefone" id="telefone" className="bg-opacity-5 bg-black rounded-md p-3 text-black text-opacity-70 text-lg"/>
                    </div>
                    <div className="flex flex-col items-start px-10 pb-10 gap-1">
                        <button className="text-white bg-green-400 rounded p-4" type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
                
            </main>
        </>
    )
}