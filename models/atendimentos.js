const conexao = require('../infraestrutura/conexao');
const moment = require('moment');

class Atendimento {
    adiciona(atendimento, res) {
        const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss');
        let data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const dataValida = moment(data).isSameOrAfter(data_criacao);
        atendimento.data = data;
        const clienteValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida, 
                mensagem: 'Campo data deve ser maior ou igual à data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteValido, 
                mensagem: 'Campo cliente deve no mínimo 5 caracteres.'
            }
            
        ];

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros);
            console.log(data_criacao);
        } else {
            const atendimentoDatado = {...atendimento, data_criacao};

            const sql = 'INSERT INTO atendimentos SET ?';
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(resultados);
                }
            });
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        })
    }

    buscaPorId(id, res) {
        let sql = `SELECT * FROM atendimentos WHERE id=${id}`;

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                let resultado = resultados[0];
                res.status(200).json(resultado);
            }
        });
    }

    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }
        let sql = 'UPDATE atendimentos SET ? WHERE id = ?';

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    deleta(id, res) {
        let sql = 'DELETE FROM atendimentos WHERE id = ?';

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }
}

module.exports = new Atendimento;