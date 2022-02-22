import { useEffect, useState } from "react"
import Axios from 'axios'
import './styleMovimentacao.scss'
import TableMovimentacoes from "../../Components/TableMovimentacoes"

const Movimentacoes = () => {
    const [conteiner, setConteiner] = useState([])
    const [form,setForm] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/getConteiner')
            .then(res=>setConteiner(res.data))
    }, [])

    const handleForm = (e) => {
        const {name,value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        Axios.post('http://localhost:3001/registerMovimentacao', {
            cliente: form.cliente,
            tipo: form.tipo,
            data_entrada: form.data_entrada,
            hora_entrada: form.hora_entrada,
            data_saida: form.data_saida,
            hora_saida: form.hora_saida
        })
        .then((res) => {
            if(res.status === 200){
                alert('Cadastrado com sucesso')
                window.location.reload()
            }
        })
    }

    return(
        <div className="conteinerMovimentacoes">
            <div className="form">
                <h3>Cadastrar Movimentações</h3>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <select onChange={handleForm} required name='cliente'>
                        <option selected value=''>Selecione o cliente</option>
                        {
                            conteiner &&
                            conteiner.map((conteinerr) => (
                                <option key={conteinerr.idconteinerr} value={conteinerr.cliente}>{conteinerr.cliente}</option>
                            ))
                        }
                    </select>
                    <select onChange={handleForm} required name='tipo'>
                        <option value=''>Tipo de Movimentação</option>
                        <option value='embarque'>Embarque</option>
                        <option value='descarga'>Descarga</option>
                        <option value='gate in'>Gate in</option>
                        <option value='gate out'>Gate out</option>
                        <option value='reposicionamento'>Reposicionamento</option>
                        <option value='pesagem'>Pesagem</option>
                        <option value='scanner'>Scanner</option>
                    </select>
                    <input onChange={handleForm} required name='data_entrada' type='date' placeholder='Data entrada' />
                    <input onChange={handleForm} required name='hora_entrada' type='time' placeholder='Hora entrada' />
                    <input onChange={handleForm} required name='data_saida' type='date' placeholder='Data saída' />
                    <input onChange={handleForm} required name='hora_saida' type='time' placeholder='Hora saída' />
                    <button type='submit'>Cadastrar</button>
                </form>
            </div>
            <TableMovimentacoes/>
        </div>
    )
}

export default Movimentacoes