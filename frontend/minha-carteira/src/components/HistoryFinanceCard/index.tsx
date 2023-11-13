
import React from 'react';
import axios from 'axios';

import { 
    Container,
    Tag,
    LeftContainer,
    RightContainer,
    DeleteIcon,
    EditIcon 
} from './styles';

interface IHistoryFinanceCardProps {
    cod: string;
    tagColor: string;
    title: string;
    subtitle: string;
    amount: string;
}

// const handleItemEdit = () => {
// }

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({
    cod,
    tagColor,
    title,
    subtitle,
    amount
}) => {

    const handleItemDelete = () => {
        if (window.confirm('Deletar o item?')) {
            axios.delete('http://localhost:8080/cashFlows/' + cod)
            window.location.reload()
        }
    }

    return (
        <Container>
            <Tag color={tagColor} />
            <RightContainer>
                <span>{title}</span>
                <small>{subtitle}</small>
            </RightContainer>
            <LeftContainer>
                <h3>{amount}</h3>
                {/* <EditIcon onClick={handleItemEdit}/> */}
                <DeleteIcon onClick={handleItemDelete}/>
            </LeftContainer>
        </Container>
    )
};

export default HistoryFinanceCard;
