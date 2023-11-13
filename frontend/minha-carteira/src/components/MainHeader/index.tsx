
import React, {useMemo, useState} from 'react';

import { useTheme } from '../../hooks/theme';

import Toggle from '../Toggle';

import emojis from '../../utils/emojis';

import {
    Container,
    Profile,
    Welcome,
    UserName,
} from './styles';

const MainHeader: React.FC = () => {

    const { theme, toggleTheme} = useTheme();

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    const userName = useMemo(() => {
        return localStorage.getItem('@minha-carteira:userName');
    }, []);

    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    }, []);
    
    return (
        <Container>
            <Toggle
                labelLeft="Light"
                labelRight="Dark"
                checked={darkTheme}
                onChange={handleChangeTheme}
            />

            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>{userName}</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader;
