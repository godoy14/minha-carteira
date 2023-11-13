
import React, { useState, useMemo, useCallback, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';

import listOfMonths from '../../utils/months';

import axios from 'axios';

import {
    Container,
    Content,
} from './styles';

type HistoryChartByYear = {
    month : number;
    amount : number;
}

const Dashboard: React.FC = () => {

    const [monthSelect, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelect, setYearSelected] = useState<number>(new Date().getFullYear());

    const [expenses, setExpenses] = useState<number>(0);
    const [gains, setGains] = useState<number>(0);
    // const [balance, setBalance] = useState<number>(0);

    const [inputHistoryChartData, setInputHistoryChartData] = useState<HistoryChartByYear[]>([]);
    const [outputHistoryChartData, setOutputHistoryChartData] = useState<HistoryChartByYear[]>([]);

    const handleMonthSelected = useCallback((month : string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('invalid month value; Is accept 0 - 12.');
        }
    }, []);

    const handleYearSelected = useCallback((year : string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('invalid Year value');
        }
    }, []);

    const months = [
        {value: 1, label: 'Janeiro'},
        {value: 2, label: 'Fevereiro'},
        {value: 3, label: 'Março'},
        {value: 4, label: 'Abril'},
        {value: 5, label: 'Maio'},
        {value: 6, label: 'Junho'},
        {value: 7, label: 'Julho'},
        {value: 8, label: 'Agosto'},
        {value: 9, label: 'Setembro'},
        {value: 10, label: 'Outubro'},
        {value: 11, label: 'Novembro'},
        {value: 12, label: 'Dezembro'},
    ];

    const years = [
        {value: 2022, label: 2022},
        {value: 2023, label: 2023},
    ];
    
    function updateGains() {
        axios.post('http://localhost:8080/estatisticas/total-expenses', {
                "userId": localStorage.getItem('@minha-carteira:userId'),
                "month": monthSelect,
                "year": yearSelect,
                "cashFlowType": "INPUT"
            })
            .then(response => {
                console.log(response.data)
                setGains(Number(response.data.totalExpenses));
            })
    }

    function updateExpenses() {
        axios.post('http://localhost:8080/estatisticas/total-expenses', {
                "userId": localStorage.getItem('@minha-carteira:userId'),
                "month": monthSelect,
                "year": yearSelect,
                "cashFlowType": "OUTPUT"
            })
            .then(response => {
                setExpenses(Number(response.data.totalExpenses));
            })
    }

    const historyData2 = useMemo(() => {

        axios.post('http://localhost:8080/estatisticas/history-chart-data', {
                "userId": localStorage.getItem('@minha-carteira:userId'),
                "year": yearSelect,
                "cashFlowType": "INPUT"
            })
            .then(
                response => {
                    const r =  response.data.map((item : any) : HistoryChartByYear => {
                        return {
                            month: item.monthNumber,
                            amount: item.amount
                        }
                    })
                    setInputHistoryChartData(r);
                })

        axios.post('http://localhost:8080/estatisticas/history-chart-data', {
            "userId": localStorage.getItem('@minha-carteira:userId'),
            "year": yearSelect,
            "cashFlowType": "OUTPUT"
        })
        .then(
            response => {
                const r =  response.data.map((item : any) : HistoryChartByYear => {
                    return {
                        month: item.monthNumber,
                        amount: item.amount
                    }
                })
                setOutputHistoryChartData(r);
            })

        return months.map(item => {
            let a = inputHistoryChartData.filter((obj) => {
                return obj.month == item.value;
            });
        })

        
    },[])

    // function updateBalance() {
    //     setBalance(gains - expenses);
    // }

    useEffect (() => {

        updateGains();
        updateExpenses();
        

    }, [monthSelect, yearSelect])

    // useEffect (() => {
    //     updateBalance();
    // }, [gains, expenses])

    const balance = useMemo(() => {
        return gains - expenses;
    },[gains, expenses])

    // const totalExpenses = useMemo(() => {
    //     let total: number = 0;
        
    //     axios.post('http://localhost:8080/estatisticas/total-expenses', {
    //             "userId": localStorage.getItem('@minha-carteira:userId'),
    //             "month": monthSelect,
    //             "year": yearSelect,
    //             "cashFlowType": "OUTPUT"
    //         })
    //         .then(response => {
    //             total = Number(response.data.totalExpenses);
    //         })
    //     console.log('Expenses:');
    //     console.log(total);
    //     return total;

    //     // expenses.forEach(item => {
    //     //     const date = new Date(item.date);
    //     //     const year = date.getFullYear();
    //     //     const month = date.getMonth() + 1;

    //     //     if(month === monthSelect && year === yearSelect){
    //     //         try {
    //     //             total += Number(item.amount);
    //     //         }catch{
    //     //             throw new Error('Invalid amount!');
    //     //         }
    //     //     }
    //     // });

    //     // return total;
    // },[monthSelect, yearSelect]);

    // const totalGains = useMemo(() => {

    //     let total: number = 0;
        
    //     axios.post('http://localhost:8080/estatisticas/total-expenses', {
    //             "userId": localStorage.getItem('@minha-carteira:userId'),
    //             "month": monthSelect,
    //             "year": yearSelect,
    //             "cashFlowType": "INPUT"
    //         })
    //         .then(response => {
    //             console.log(response.data)
    //             total += Number(response.data.totalExpenses);
    //         })
    //     console.log('Gains:');
    //     console.log(total);
    //     console.log(monthSelect);
    //     console.log(yearSelect);
    //     return total;
    //     // let total: number = 0;

    //     // gains.forEach(item => {
    //     //     const date = new Date(item.date);
    //     //     const year = date.getFullYear();
    //     //     const month = date.getMonth() + 1;

    //     //     if(month === monthSelect && year === yearSelect){
    //     //         try {
    //     //             total += Number(item.amount);
    //     //         }catch{
    //     //             throw new Error('Invalid amount!');
    //     //         }
    //     //     }
    //     // });

    //     // return total;
    // },[monthSelect, yearSelect]);

    // const totalBalance = useMemo(() => {
    //     return totalGains - totalExpenses;
    // }, [totalGains, totalExpenses]);

    const message = useMemo(() => {

        if(balance < 0){
            return {
                title: "Que triste!",
                description:"Nesse mës vocë gastou mais do que deveria!",
                footerText:"Verifique seus gastos.",
                icon:sadImg
            }
        }
        else if(expenses === 0 && gains ===0) {
            return {
                title: "Ops!",
                description:"Neste mês, não há registros!!",
                footerText:"Nenhum registro cadastrado esse mês.",
                icon:grinningImg
            }
        }
        else if(balance === 0){
            return {
                title: "Ufa!",
                description:"Quase Hein!!",
                footerText:"Tenha cuidado.",
                icon:grinningImg
            }
        }
        else{
            return {
                title: "Muito bem!",
                description:"Sua carteira fechou positiva!",
                footerText:"Continue assim.",
                icon:happyImg
            }
        }
        
    }, [balance, expenses, gains]);

    const relationExpensesVersusGains = useMemo(() => {
        const total = gains + expenses;

        const percentGains = Number(((gains / total) * 100).toFixed(1));
        const percentExpenses = Number(((expenses / total) * 100).toFixed(1));

        const data = [
            {
                name: "Entradas",
                value: gains,
                percent: percentGains ? percentGains : 0,
                color: '#e44c4e'
            },
            {
                name: "Saídas",
                value: expenses,
                percent: percentExpenses ? percentExpenses : 0,
                color: '#f7931b'
            }
        ];

        return data;
    },[gains, expenses]);

    const historyData = useMemo(() => {
        

        return listOfMonths.map((_, month ) => {
            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMonth === month && gainYear === yearSelect){
                    try {
                        amountEntry += Number(gain.amount);
                    } catch {
                        throw new Error('amountEntry is invalid!')
                    }
                }
            });

            let amountOutput = 0;
            gains.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth() + 1;
                const expenseYear = date.getFullYear();

                if(expenseMonth === month && expenseYear === yearSelect){
                    try {
                        amountOutput += Number(expense.amount);
                    } catch {
                        throw new Error('amountOutput is invalid!')
                    }
                }
            });

            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0,3),
                amountEntry,
                amountOutput
            }
        }).filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            return (yearSelect === currentYear && item.monthNumber <= currentMonth) || (yearSelect < currentYear)
        })
    },[yearSelect]);

    const relationExpensesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses
        .filter((expense) => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelect && year === yearSelect;
        })
        .forEach((expense) => {
            if(expense.frequency === 'recorrente'){
                return amountRecurrent += Number(expense.amount);
            }

            if(expense.frequency === 'eventual'){
                return amountEventual += Number(expense.amount);
            }
        });

        const total = amountRecurrent + amountEventual;

        const recurrentPercent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: "Recorrentes",
                amount: amountRecurrent,
                percent: recurrentPercent ? recurrentPercent : 0,
                color: "#f7931b"
            },
            {
                name: "Eventuais",
                amount: amountEventual,
                percent: eventualPercent ? eventualPercent : 0,
                color: "#e44c4e"
            }
        ]
    },[monthSelect, yearSelect]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains
        .filter((gain) => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelect && year === yearSelect;
        })
        .forEach((gain) => {
            if(gain.frequency === 'recorrente'){
                return amountRecurrent += Number(gain.amount);
            }

            if(gain.frequency === 'eventual'){
                return amountEventual += Number(gain.amount);
            }
        });

        const total = amountRecurrent + amountEventual;

        const recurrentPercent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: "Recorrentes",
                amount: amountRecurrent,
                percent: recurrentPercent ? recurrentPercent : 0,
                color: "#f7931b"
            },
            {
                name: "Eventuais",
                amount: amountEventual,
                percent: eventualPercent ? eventualPercent : 0,
                color: "#e44c4e"
            }
        ]
    },[monthSelect, yearSelect]);

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor='#f7931b'>
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

            <Content>
                <WalletBox
                    title="Saldo"
                    amount={balance}
                    footerLabel="atualizado com base"
                    icon="dolar"
                    color="#4e41f0"
                />

                <WalletBox
                    title="Entradas"
                    amount={gains}
                    footerLabel="entradas"
                    icon="arrowUp"
                    color="#f7931b"
                />

                <WalletBox
                    title="Saídas"
                    amount={expenses}
                    footerLabel="Saídas"
                    icon="arrowDown"
                    color="#e44c4e"
                />

                <MessageBox
                    title= {message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChartBox data={relationExpensesVersusGains} />

                {/* <HistoryBox 
                    data={historyData}
                    lineColorAmountEntry="#f7931b"
                    lineColorAmountOutout="#e44c4e"
                />

                <BarChartBox
                    data={relationExpensesRecurrentVersusEventual}
                    title="Saídas" 
                />

                <BarChartBox
                    data={relationGainsRecurrentVersusEventual}
                    title="Entradas" 
                /> */}
                
            </Content>
        </Container>
    );
}

export default Dashboard;
