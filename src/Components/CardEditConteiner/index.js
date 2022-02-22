import {useState} from 'react'
import './styleEditConteiner.scss'
import Axios from 'axios'

const CardEditConteiner = ({props, viewCard, setViewCard, refresh, setRefresh}) => {
    const [editData, setEditData] = useState({
        idconteiners: props.idconteiners,
        cliente: props.cliente,
        nConteiner: props.nConteiner,
        tipo: props.tipo,
        status: props.status,
        categoria: props.categoria
    })

    const handleForm = (e) => {
        const {name, value} = e.target
        setEditData({
            ...editData,
            [name]: value
        })
    }

    const handleEditConteiner = (e) => {
        e.preventDefault()
        
        Axios.put('http://localhost:3001/editConteiner', {
            idconteiners: editData.idconteiners,
            cliente: editData.cliente,
            nConteiner: editData.nConteiner,
            tipo: editData.tipo,
            status: editData.status,
            categoria: editData.categoria
        })
        .then(setViewCard((false)), setRefresh((!refresh)))
    }

    const handleDeleteConteiner = () => {
        Axios.delete(`http://localhost:3001/deleteConteiner/${editData.idconteiners}`)
        .then(setRefresh(!refresh))
    }


    return(
        <div className='conteinerCard'>
            <div className='form'>
                <form onSubmit={(e)=>handleEditConteiner(e)}>
                    <input onChange={handleForm} defaultValue={editData.cliente} name='cliente' />
                    <input onChange={handleForm} defaultValue={editData.nConteiner} name='nConteiner' />
                    <select onChange={handleForm}defaultValue={editData.tipo} name='tipo' >
                        <option selected value=''> Tipo de conteiner</option>
                        <option value='20'> 20</option>
                        <option value='40'>40</option>
                    </select>
                    <select onChange={handleForm} defaultValue={editData.status} name='status'>
                        <option selected value=''> Status do conteiner</option>
                        <option value='cheio'> Cheio</option>
                        <option value='vazio'>Vazio</option>
                    </select>
                    <select onChange={handleForm} defaultValue={editData.categoria} name='categoria'>
                        <option selected value=''> Categoria do conteiner</option>
                        <option value='importacao'> Importação</option>
                        <option value='exportacao'>Exportacao</option>
                    </select>
                    <div className='buttons'>
                        <button onClick={()=>setViewCard(false)}>Cancelar</button>
                        <button type='submit'>Salvar</button>
                        <button onClick={()=>handleDeleteConteiner()}>Deletar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CardEditConteiner