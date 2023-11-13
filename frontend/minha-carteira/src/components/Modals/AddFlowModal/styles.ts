import styled from "styled-components";

export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 700;
    width: 350px;
    outline: 0;

    border: 3px solid black;
    border-radius: 10px;

    background-color: ${props => props.theme.colors.secondary};
`;

export const ModalHeader = styled.div`

    height: 50px;

    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding-left: 5px;

`;

export const TitleHeader = styled.p`
    
    font-size: 22px;
    margin-left: 7px;
    color: ${props => props.theme.colors.white};
`;

export const CloseButton = styled.div`

    font-size: 30px;
    border: none;
    border-radius: 3px;
    margin-left: 0.5rem;
    margin-right: 5px;
    background: none;
    :hover {
    cursor: pointer;
    }

`;

export const InfoBox = styled.form`
    display: flex;
    flex-direction: row;

    font-size: 20px;
    font-weight: bold;

    justify-content: space-between;

    padding: 10px 5px 5px 10px;

    margin: 7px 0;

    > input {
        padding-left: 5px;
        border-radius: 7px;
    }

    > textarea {
        border-radius: 7px;
    }

`;

export const Form = styled.div`

    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;

`;

export const DatePickerContainer = styled.div`
    align-items: left;
`;

export const ButtonContainer = styled.div`
    margin:  5px 15% 0 15%;
`