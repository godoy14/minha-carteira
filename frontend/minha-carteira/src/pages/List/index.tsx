
import React, { useMemo, useState, useEffect } from 'react';

import { Container, Content, Filters, AddButtonContainer } from './styles';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import AddButton from '../../components/AddButton';

import axios from 'axios';

import formatCurrent from '../../utils/formatCurrent';
import formatDate from '../../utils/formatDate';

import AddFlowModal from '../../components/Modals/AddFlowModal';
import { useModal } from '../../components/Modals/AddFlowModal/useModal';

import { useParams } from 'react-router-dom';
import { CashFlow } from '../../models/cashFlow';

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
};

enum frequencyEnum {
    RECURRENT,
    EVENTUAL
}

const List: React.FC = () => {

    const [dataPage, setDataPage] = useState<IData[]>([]);
    const [dataCashFlow, setDataCashFlow] = useState<CashFlow[]>([]);
    const [monthSelect, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelect, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencyFilterSelected, setfrequencyFilterSelected] = useState<frequencyEnum[]>([]);

    const months = [
        { value: 1, label: 'Janeiro' },
        { value: 2, label: 'Fevereiro' },
        { value: 3, label: 'Março' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Maio' },
        { value: 6, label: 'Junho' },
        { value: 7, label: 'Julho' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Setembro' },
        { value: 10, label: 'Outubro' },
        { value: 11, label: 'Março' },
        { value: 12, label: 'Dezembro' },
    ]

    const years = [
        { value: 2022, label: 2022 },
        { value: 2023, label: 2023 },
    ];

    const handleFrequencyClick = (frequency: frequencyEnum) => {

        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

        if (alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(item => item !== frequency);
            setfrequencyFilterSelected(filtered);
        } else {
            setfrequencyFilterSelected((prev) => [...prev, frequency]);
        }
    };

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('invalid month value; Is accept 0 - 12.');
        }
    };

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('invalid Year value');
        }
    };

    const { isShown, toggle } = useModal();
    
    let params = useParams();
    const pageData = useMemo(() => 
    {
        
        return params.type === 'entry-balance' ?
        {
            title: 'Entradas',
            lineColor: '#4e41f0'
        }
        :
        {
            title: 'Saídas',
            lineColor: '#e44c4e'
        }
    }, []);

    function loadDataCashFlowInput() {
        const userId = localStorage.getItem('@minha-carteira:userId');
        axios.get('http://localhost:8080/cashFlows/user/' + userId + '/INPUT')
                .then(response => {
                    const r = response.data.map((item: CashFlow) => {
                        return {
                            id: item.id,
                            description: item.description,
                            typeCash: item.typeCash,
                            frequency: item.frequency,
                            amount: item.amount,
                            date: item.date,
                        }
                    })
                    setDataCashFlow(r);
                })
    }

    useEffect(() => {

        if (params.type === 'entry-balance'){
            loadDataCashFlowInput();
        } else {
            axios.get('http://localhost:8080/cashFlows/user/1/OUTPUT')
                .then(response => {
                    const r = response.data.map((item: CashFlow) => {
                        return {
                            id: item.id,
                            description: item.description,
                            typeCash: item.typeCash,
                            frequency: item.frequency,
                            amount: item.amount,
                            date: item.date,
                        }
                    })
                    setDataCashFlow(r);
                })
        }

        const filteredDate = dataCashFlow.filter(item => {
            var f;
            if(item.frequency === 'RECURRENT') {
                f = frequencyEnum.RECURRENT;
            } else {
                f = frequencyEnum.EVENTUAL;
            }

            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelect && year === yearSelect && frequencyFilterSelected.includes(f);
        });

        const formattedData = filteredDate.map(item => {

            return {
                id: String(item.id), // String(Math.random() * filteredDate.length),
                description: item.description,
                amountFormatted: formatCurrent(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'RECURRENT' ? '#4e41f0' : '#e44c4e'
            }
        })
        setDataPage(formattedData);
    }, [monthSelect, yearSelect, frequencyFilterSelected, isShown]);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput
                    options={months}
                    onChange={(e) => handleMonthSelected(e.target.value)}
                    defaultValue={monthSelect}
                />
                <SelectInput
                    options={years}
                    onChange={(e) => handleYearSelected(e.target.value)}
                    defaultValue={yearSelect}
                />
            </ContentHeader>

            <AddButtonContainer>
                <AddButton onClick={toggle}>Adicionar novo Fluxo Financeiro</AddButton>
                <AddFlowModal
                    isModalVisible={isShown}
                    hideModal={toggle}
                    entry_type= {String(params.type)}
                />

            </AddButtonContainer>

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent
                    ${frequencyFilterSelected.includes(frequencyEnum.RECURRENT) && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick(frequencyEnum.RECURRENT)}
                >
                    Recorrentes
                </button>
                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual
                    ${frequencyFilterSelected.includes(frequencyEnum.EVENTUAL) && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick(frequencyEnum.EVENTUAL)}
                >
                    Eventuais
                </button>
            </Filters>

            <Content>
                {
                    dataPage.map((item: { id: string; tagColor: string; description: string; dateFormatted: string; amountFormatted: string; }) => (
                        <HistoryFinanceCard
                            key={item.id}
                            cod={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />
                    ))

                }
            </Content>
        </Container>
    )
}

export default List;
