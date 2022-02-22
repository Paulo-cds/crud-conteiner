import {useState} from 'react'
import './styleCardEditMov.scss'
import Axios from 'axios'


const CardEditMovimentacoes = ({props, viewCardMov, setViewCardMov, refresh, setRefresh}) => {
    const [editData, setEditData] = useState({
        idmovimentacoes: props.idmovimentacoes,
        cliente: props.cliente,
        tipo: props.tipo,
        data_entrada: props.data_entrada,
        hora_entrada: props.hora_entrada,
        data_saida: props.data_saida,
        hora_saida: props.hora_saida
    })

    const handleForm = (e) => {
        const {name,value} = e.target
        setEditData({
            ...editData,
            [name]: value
        })
    }

    const handleEditMov = (e) => {
        e.preventDefault()
        Axios.put('http://localhost:3001/editMovimentacoes',{
            idmovimentacoes: editData.idmovimentacoes,
            cliente: editData.cliente,
            tipo: editData.tipo,
            data_entrada: editData.data_entrada,
            hora_entrada: editData.hora_entrada,
            data_saida: editData.data_saida,
            hora_saida: editData.hora_saida
        })
        .then(setViewCardMov(false), setRefresh(!refresh))
    }

    const handleDaleteMovimentacoes = () => {
        Axios.delete(`http://localhost:3001/deleteMovimentacoes/${editData.idmovimentacoes}`)
        .then(setRefresh(!refresh))
    }


    return(
        <div className='conteinerCard'>
            <div className='form'>
                <form onSubmit={(e)=>handleEditMov(e)}>
                    <input onChange={handleForm} defaultValue={editData.cliente} name='cliente'/>
                    <select onChange={handleForm} defaultValue={editData.tipo} name='tipo' >
                        <option value='embarque'>Embarque</option>
                        <option value='descarga'>Descarga</option>
                        <option value='gate in'>Gate in</option>
                        <option value='gate out'>Gate out</option>
                        <option value='reposicionamento'>Reposicionamento</option>
                        <option value='pesagem'>Pesagem</option>
                        <option value='scanner'>Scanner</option>
                    </select>
                    <input onChange={handleForm} required name='data_entrada' type='date' defaultValue={editData.data_entrada} />
                    <input onChange={handleForm} required name='hora_entrada' type='time' defaultValue={editData.hora_entrada} />
                    <input onChange={handleForm} required name='data_saida' type='date' defaultValue={editData.data_saida} />
                    <input onChange={handleForm} required name='hora_saida' type='time' defaultValue={editData.hora_saida} />
                    <div className='buttons'>
                        <button onClick={()=>setViewCardMov(false)}>Cancelar</button>
                        <button  type='submit'>Salvar</button>
                        <button onClick={()=>handleDaleteMovimentacoes()}>Excluir</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CardEditMovimentacoes