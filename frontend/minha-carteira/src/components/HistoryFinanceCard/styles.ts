import styled, {keyframes} from "styled-components";
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';


const animate = keyframes`
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }
    50% {
        opacity: .3;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`;

interface ITagProps {
    color: string;
}

export const Container = styled.li`
    background-color: ${props => props.theme.colors.tertiary};

    list-style: none;
    border-radius: 10px;

    margin: 10px 0;
    padding: 12px 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;


    transition: all .3s;

    position: relative;

    animation: ${animate} .5s ease;

    &:hover {
        opacity: .7;
        transform: translateX(10px);
    }

    > div span {
        font-size: 22px;
        font-weight: 500;
    }

`;

export const Tag = styled.div<ITagProps>`
    width: 13px;
    height: 60%;
    border-radius: 8px;

    background-color: ${props => props.color};
    
    position: absolute;
    left: 0;
`;

export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-left: 10px;
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding-right: 10px;

    > h3 {
        padding-right: 15px;
    }
`;

export const DeleteIcon = styled(AiFillDelete)`
    width: 30px;
    height: 30px;

    color: red;
    background-color: black;
    border-radius: 3px;

    cursor: pointer;

    &:hover {
        opacity: .7;
    }

`;

export const EditIcon = styled(AiOutlineEdit)`
    width: 30px;
    height: 30px;

    color: red;
    background-color: black;
    border-radius: 3px;

    margin-right: 10px;

    cursor: pointer;

    &:hover {
        opacity: .7;
    }

`;