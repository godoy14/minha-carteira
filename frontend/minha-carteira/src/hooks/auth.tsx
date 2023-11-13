import React, { createContext, useContext, useState } from "react";

import axios from 'axios';

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children}) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');

        return !!isLogged;
    });

    const signIn = (email: string,password: string) => {
        axios.get('http://localhost:8080/users/verifyAuth',
            {params: {
                email: email,
                password: password
            }})
            .then((response) => {
                console.log(response.data);
                alert('Conectado com sucesso!');
                localStorage.setItem('@minha-carteira:logged', 'true');
                localStorage.setItem('@minha-carteira:userId', response.data.id);
                localStorage.setItem('@minha-carteira:userName', response.data.name);
                localStorage.setItem('@minha-carteira:userEmail', response.data.email);
                setLogged(true);
            })
            .catch(error => {
                if (error.response.status === 404){
                    alert('E-mail inválido!');
                } else if (error.response.status === 401) {
                    alert('Senha incorreta!');
                } else {
                    alert('Não foi possível efetuar a conexão!\nFavor verificar os dados informados e tentar novamente');
                }
            })


        // if(email === 'admin@admin.com' && password === 'admin'){
        //     localStorage.setItem('@minha-carteira:logged', 'true');
        //     setLogged(true);
        // } else{
        //     alert('Usuário ou senha incorretos!');
        // }
    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        localStorage.removeItem('@minha-carteira:userId');
        localStorage.removeItem('@minha-carteira:userName');
        localStorage.removeItem('@minha-carteira:userEmail');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{logged, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );

}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };