import styled from 'styled-components';

export const Container = styled.button`

    width: 40%;

    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    margin: 7px 0;
    padding: 10px;

    border-radius: 5px;

    font-weight: bold;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.warning};

    transition: opacity .3s;

    &:hover{
        opacity: .7;
    }

`;