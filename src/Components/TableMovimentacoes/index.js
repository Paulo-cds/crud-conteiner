import Axios from 'axios'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import './styleTableMovimentacoes.scss'
import CardEditMovimentacoes from '../CardEditMovimentacoes'

const TableMovimentacoes = () => {
    const [dataMovimentacao, setDataMovimentacao] = useState([])
    const [viewCardMov, setViewCardMov]= useState(false)
    const [propsCard, setPropsCard] = useState({})
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        Axios.get('http://localhost:3001/getMovimentacoes')
            .then(res=>setDataMovimentacao(res.data))
    }, [refresh])

    const handleCardMov = (data) => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        setViewCardMov(true)
        setPropsCard(data)
    }

    return(
        <div className='tableMov'>
            {
                viewCardMov && 
                <CardEditMovimentacoes 
                    props={propsCard}
                    viewCardMov={viewCardMov}
                    setViewCardMov={setViewCardMov}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            }
            <div className='table'>
                <ul>
                    <div className='listData'>
                        <li>Cliente</li>
                        <li>Tipo</li>
                        <li>Data entrada</li>
                        <li>Hora entrada</li>
                        <li>Data saída</li>
                        <li>Hora saída</li>
                    </div>
                    {
                        dataMovimentacao &&
                        dataMovimentacao.map((datas) => (
                            <div key={datas.idmovimentacoes} onClick={()=>handleCardMov(datas)} className='listData'>
                                <li>{datas.cliente}</li>
                                <li>{datas.tipo}</li>
                                <li><Moment format="DD/MM/YYYY">{datas.data_entrada}</Moment></li>
                                <li>{datas.hora_entrada}</li>
                                <li><Moment format="DD/MM/YYYY">{datas.data_saida}</Moment></li>
                                <li>{datas.hora_saida}</li>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default TableMovimentacoes