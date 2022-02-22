import Axios from 'axios'
import {useEffect, useState} from 'react'
import './styleTableConteiner.scss'
import CardEditConteiner from '../CardEditConteiner'


const TableConteiner = () => {
    const [data, setData] = useState([])
    const [viewCard, setViewCard] = useState(false)
    const [propsCard, setPropsCard] = useState({})
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        Axios.get('http://localhost:3001/getConteiner')
            .then(res=>setData(res.data))
    }, [refresh])

    const handleCard = (data) => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        setViewCard(true)
        setPropsCard(data)
    }

    return(
        <div className='conteinerTable'>
            {
                viewCard &&
                 <CardEditConteiner 
                    props={propsCard}
                    viewCard={viewCard}
                    setViewCard={setViewCard}
                    refresh={refresh}
                    setRefresh={setRefresh}
                 />
            }
            <div className='table'>
                <ul>
                    <div className='listData'>
                        <li>Cliente</li>
                        <li>Número</li>
                        <li>Tipo</li>
                        <li>Status</li>
                        <li>Categoria</li>
                    </div>
                    {
                        data && 
                            data.map((datas) => (
                                <div className='listData'
                                onClick={()=>handleCard(datas)}>
                                    <li>{datas.cliente}</li>
                                    <li>{datas.nConteiner}</li>
                                    <li>{datas.tipo}</li>
                                    <li>{datas.status}</li>
                                    <li>{datas.categoria}</li>
                                </div>
                            ))
                    }
                </ul>
            </div>
        </div>
    )
}


export default TableConteiner