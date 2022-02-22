const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nos141212',
    database: 'controleconteiner'
})

app.use(cors())
app.use(express.json())
app.listen(3001, () => {
    console.log('Servidor rodando')
})


/*CRUD conteiner*/

app.post('/registerConteiner', (req,res) => {
    const {cliente, nConteiner, tipo, status, categoria} = req.body    
    let SQL = `INSERT INTO conteiners (cliente, nConteiner, tipo, status, categoria) VALUES ('${cliente}', '${nConteiner}', '${tipo}', '${status}', '${categoria}')`

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

app.get('/getConteiner', (req,res) => {
    let SQL = 'SELECT * FROM conteiners'
    db.query(SQL, (err,result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

app.put('/editConteiner', (req,res) =>{
    const {idconteiners, cliente, nConteiner, tipo, status, categoria} = req.body     

    let SQL = `UPDATE conteiners SET cliente = '${cliente}', nConteiner = '${nConteiner}', tipo = '${tipo}', status = '${status}', categoria = '${categoria}' WHERE idconteiners = ${idconteiners}`

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

app.delete('/deleteConteiner/:id', (req,res) => {
    const {id} = req.params
    let SQL = `DELETE FROM conteiners WHERE idconteiners = ${id}`

    db.query(SQL, (err,result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})


/*CRUD Movimentações*/

app.post('/registerMovimentacao', (req,res) => {
    const{cliente, tipo, data_entrada, hora_entrada, data_saida, hora_saida} = req.body
    let SQL = `INSERT INTO movimentacoes (cliente, tipo, data_entrada, hora_entrada, data_saida, hora_saida) VALUES ('${cliente}', '${tipo}', '${data_entrada}', '${hora_entrada}', '${data_saida}', '${hora_saida}')`

    db.query(SQL, (err,result) => {
        if(err)console.log(err)
        else res.send(result)
    })
})

app.get('/getMovimentacoes', (req,res) => {
    let SQL = 'SELECT * FROM movimentacoes'
    db.query(SQL, (err,result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

app.put('/editMovimentacoes', (req,res) => {
    const {idmovimentacoes, cliente, tipo, data_entrada, hora_entrada, data_saida, hora_saida} = req.body

    let SQL = `UPDATE movimentacoes SET cliente = '${cliente}', tipo = '${tipo}', data_entrada = '${data_entrada}', hora_entrada = '${hora_entrada}', data_saida = '${data_saida}', hora_saida = '${hora_saida}' WHERE idmovimentacoes = ${idmovimentacoes} `

    db.query(SQL, (err,result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

app.delete('/deleteMovimentacoes/:id', (req,res) => {
    const {id} = req.params
    let SQL = `DELETE FROM movimentacoes WHERE idmovimentacoes = ${id}`

    db.query(SQL, (err, result) => {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})


/*filtros*/

/*filtra por cliente por tipo de movimentacao*/
app.get('/selectCliente/:search', (req,res) => {
    const {search} = req.params
    let SQL = `SELECT tipo, COUNT(*) AS qtd_tipo FROM movimentacoes WHERE cliente = '${search}' GROUP BY tipo`

    db.query(SQL, (err,result) => {
        if(err)console.log(err)
        else res.send(result)
    })
})

/*filtra por categoria*/
app.get('/selectImportExport', (req,res) => {
    const {search} = req.body
    let SQL = 'SELECT categoria, COUNT(*) AS qtd_importexport FROM conteiners GROUP BY categoria'

    db.query(SQL, (err,result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})