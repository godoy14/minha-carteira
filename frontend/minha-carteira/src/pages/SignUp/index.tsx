import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/input';
import Button from '../../components/Button';
import imgLogo from '../../assets/logo.svg';

import axios from 'axios';

import {
    Container,
    Logo,
    Form,
    FormTitle
} from './styles';

const SignUp: React.FC = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    const cadastrarUser = () => {
        axios.post('http://localhost:8080/users', {
            "name": name,
            "email": email,
            "password": password
        })
        .then(response => {
            alert('Cadastra efetuado com sucesso!');
            window.location.href = '/signin';
            // navigate('/signin');
        })
        .catch(error => {
            if (error.response.status === 409){
                alert('Não foi possível finalizar o cadastro!\nMotivo: E-mail já cadastrado');
            } else {
                alert('Não foi possível finalizar o cadastro!\nFavor verificar os dados informados e tentar novamente');
            }
        })
    }

    return (
        <Container>
            <Logo>
                <img src={imgLogo} alt="Minha Carteira" />
                <h2>Minha Carteira</h2>
            </Logo>

            <Form onSubmit={() => cadastrarUser()}>
                <FormTitle>Cadastro</FormTitle>

                <Input
                    type="text"
                    placeholder='Nome'
                    required
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    type="email"
                    placeholder='Email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder='Senha'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type='submit'>Cadastrar</Button>
            </Form>
        </Container>
    );
};

export default SignUp;