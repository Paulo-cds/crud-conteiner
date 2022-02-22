import {useState} from 'react'
import './styleConteiner.scss'
import Axios from 'axios'
import TableConteiner from '../../Components/TableConteiner'


const Conteiner = () => {
    const [form, setForm] = useState([])

    const handleForm = (e) => {
        const {name, value} = e.target

        setForm({
            ...form,
            [name]: value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if(form.client && form.nConteiner && form.type && form.status && form.category){
            if(/[a-zA-Z]{4}\d{7}/.test(form.nConteiner)){
                Axios.post('http://localhost:3001/registerConteiner', {
                    cliente: form.client,
                    nConteiner: form.nConteiner,
                    tipo: form.type,
                    status: form.status,
                    categoria: form.category
                })
                .then((res) => {
                    if(res.status === 200){
                        alert('Cadastrado com sucesso!')
                        window.location.reload()
                    }
                    else {
                        console.log(res)
                    }
                })
            } else {
                alert('O campo número do conteiner deve conter 4 letras e 7 números!')
            }
        } else {
            alert('Prencha todos os campos!')
        }
    }


    return(
        <div className="conteiner">
            <div className="form">
                <h3>Cadastrar Conteiner</h3>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <input onChange={handleForm} required placeholder='Cliente' name='client' />
                    <input onChange={handleForm} required placeholder='Número do conteiner' name='nConteiner' />
                    <select onChange={handleForm} placeholder='Tipo' name='type' >
                        <option selected value=''> Tipo de conteiner</option>
                        <option value='20'> 20</option>
                        <option value='40'>40</option>
                    </select>
                    <select onChange={handleForm} required placeholder="Status" name='status'>
                        <option selected value=''> Status do conteiner</option>
                        <option value='cheio'> Cheio</option>
                        <option value='vazio'>Vazio</option>
                    </select>
                    <select onChange={handleForm} required placeholder="Categoria" name='category'>
                        <option selected value=''> Categoria do conteiner</option>
                        <option value='importacao'> Importação</option>
                        <option value='exportacao'>Exportacao</option>
                    </select>
                    <button type='submit'>Cadastrar</button>
                </form>
            </div>
            <TableConteiner/>
        </div>
    )
}

export default Conteiner