import React, { useState } from "react";
import ReactDOM  from 'react-dom';
import Button from "../../Button";
import Input from "../../input";

import axios from 'axios';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    ModalContainer,
    ModalHeader,
    CloseButton,
    Form,
    InfoBox,
    TitleHeader,
    DatePickerContainer,
    ButtonContainer,
} from './styles';

function translateEntry(entry : String) {
    switch (entry) {
        case 'entry-balance':
            return 'INPUT'
        case 'exit-balance':
            return 'OUTPUT'
        default:
            break
    }
}

function formatData(data : any) {
    const d = new Date(String(data));
    var day = String(d.getDate()).padStart(2, '0'),
        month = String((d.getMonth() + 1)).padStart(2, '0'),
        year = String(d.getFullYear());
    return [year, month, day].join('-');
}

interface IModalProps {
    isModalVisible: boolean;
    hideModal: () => void;
    entry_type : string;
}

const AddFlowModal: React.FC<IModalProps> = ({
    isModalVisible,
    hideModal,
    entry_type,
}) => {

    function handleSubmitButtonClick () {
        hideModal();
        newEntry();
    }

    const newEntry = () => {
        const userId = localStorage.getItem('@minha-carteira:userId');
        const cashFlow = {
            'description': description,
            'typeCash': translateEntry(entry_type),
            'frequency': String(frequency).toUpperCase(),
            'amount': amount,
            'date': formatData(flowDate),
            'user': {
                'id': userId
            }
        }

        console.log(cashFlow);

        axios.post('http://localhost:8080/cashFlows', cashFlow, {
                headers: {
                'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response)
            })
    } 

    const [description, setDescription] =useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [frequency, setFrequency] = useState<string>('recurrent');
    const [flowDate, setFlowDate] = useState(new Date());

    const modal = (
        <ModalContainer>
            <ModalHeader>
                <TitleHeader>Adicionar Fluxo Financeiro!</TitleHeader>
                <CloseButton onClick={hideModal}>X</CloseButton>
            </ModalHeader>

            <Form>
                <InfoBox>
                    <label>Descrição:</label>
                    <textarea
                        placeholder='Descrição'
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </InfoBox>

                <InfoBox>
                    <label>Quantia:</label>
                    <input
                        type='text'
                        placeholder='R$0.00'
                        required
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </InfoBox>

                <InfoBox>
                    <label>Frequência:</label>
                    <select onChange={(e) => setFrequency(e.target.value)}>
                        <option value='recurrent'>Recorrente</option>
                        <option value='eventual'>Eventual</option>
                    </select>
                </InfoBox>

                <InfoBox>
                    <label>Data:</label>
                    <DatePickerContainer>
                        <DatePicker
                            selected={flowDate}
                            onSelect={(date:Date) => setFlowDate(date)}
                            onChange={(date:Date) => setFlowDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </DatePickerContainer>
                </InfoBox>

                <ButtonContainer>
                    <Button type='submit' onClick={handleSubmitButtonClick}>
                        Adicionar
                    </Button>
                </ButtonContainer>
            </Form>
        </ModalContainer>
    );

    return isModalVisible ? ReactDOM.createPortal(modal, document.body) : null;
}

export default AddFlowModal;