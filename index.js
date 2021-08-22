const customExpress = require('./config/customExpress');
const porta = 3000;
const app = customExpress();

app.listen(porta, () => console.log('servidor rodando na porta ' + porta));

