import Axios from "axios"
import { useEffect, useState } from "react"
import './styleRelatorios.scss'



const Relatorios = () => {
    const [dataMovimentacoes, setDataMovimentacoes] = useState()
    const [filtro, setFiltro] = useState([])
    const [relatorio, setRelatorio] = useState(false)   
    const [importExport, setImportExport] = useState()
    let controle =[]

    useEffect(() => {
        Axios.get('http://localhost:3001/getMovimentacoes')
            .then(res=>{setDataMovimentacoes(res.data)})

        Axios.get('http://localhost:3001/selectImportExport')
            .then(res=>{setImportExport(res.data)})
    }, [])

    const selectCliente = () => {
        if(dataMovimentacoes){
            for(let x=0; x<dataMovimentacoes.length; x++){
                if(x===0){
                    controle.push(dataMovimentacoes[x].cliente)
                } else {
                    if(!controle.includes(dataMovimentacoes[x].cliente)){
                        controle.push(dataMovimentacoes[x].cliente)
                    }
                }
            }
        }
        searchClient()
    }

    const searchClient = () => {
        for(let x=0; x<controle.length; x++){
            Axios.get(`http://localhost:3001/selectCliente/${controle[x]}`)
             .then(res=>{               
                setFiltro(prevState => [...prevState, {cliente: controle[x], filtro: res.data}])
             })
        }
        setRelatorio(true)
    }

    const filtrando = (data,index) => {
        let fil = filtro[index].filtro.filter(client => (client.tipo === data))
        return fil.length > 0 ? fil[0].qtd_tipo : 0
    }

    return(
        <div className="conteinerRelatorio">
            <button onClick={()=>selectCliente()}>Gerar relatórios</button>
            {
                relatorio &&
                <>
                    <div className="table">
                        <ul>
                            <div className="listData">
                                <li>Cliente</li>
                                <li >Embarque</li>
                                <li >Descarga</li>
                                <li >Gate in</li>
                                <li >Gate out</li>
                                <li >Reposicionamento</li>
                                <li >Pesagem</li>
                                <li>Scanner</li>
                            </div>
                            {
                                filtro &&
                                filtro.map((filt, index) => (
                                    <div className="listData">
                                        <li>{filt.cliente}</li>
                                        <li>{filtrando('embarque', index)}</li>
                                        <li>{filtrando('descarga', index)}</li>
                                        <li>{filtrando('gate in', index)}</li>
                                        <li>{filtrando('gate out', index)}</li>
                                        <li>{filtrando('reposicionamento', index)}</li>
                                        <li>{filtrando('pesagem', index)}</li>
                                        <li>{filtrando('scanner', index)}</li>
                                    </div>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="sumario">
                        {
                            importExport &&
                            <>
                                <h3>Sumário</h3>
                                <p>Total de Importações: {importExport[0].qtd_importexport}</p>
                                <p>Total de Exportações: {importExport[1] ? importExport[1].qtd_importexport : 0}</p>
                            </>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default Relatorios