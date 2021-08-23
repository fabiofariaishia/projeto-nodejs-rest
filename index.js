const customExpress = require('./config/customExpress');
const porta = 3000;
const Tabelas = require('./infraestrutura/tabelas');
const conexao = require('./infraestrutura/conexao');

conexao.connect(erro => {
    if (erro) {
        console.log(erro);
    } else {
        const app = customExpress();

        Tabelas.init(conexao);
        app.listen(porta, () => console.log('servidor rodando na porta ' + porta));
    }
});



