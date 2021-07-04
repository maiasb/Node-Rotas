// Importando express
import express, { json } from 'express';

// Importando rotas
import routes from './routes';

// Definindo app
const app = express();

// App reconhece json nas requisições
app.use(express.json());

// App usa rotas
app.use(routes);

// Inicia o app
app.listen(3333, () => {
    console.log('😍Back-end started!😍')
});