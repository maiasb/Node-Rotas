const express = require('express');

const app = express();

app.use(express.json());

/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações no back-end;
 * POST: Criar informações no back-end;
 * PUT: Alterar todas as informações do recurso no back-end;
 * PATCH: Alterar apenas uma informação do recurso no back-end;
 * DELETE: Deletar uma informação do back-end;
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação;
 * Route Params: Identificar recursos (Atualizar/Deletar);
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON);
 */

app.get('/projects', (request, response) => {
    // Todos os parâmetros
    const query = request.query;
    // Parâmetros desestruturados
    const { title, owner } = request.query;

    console.log(query)
    console.log(title)
    console.log(owner)

    return response.json([
        'Project 01',
        'Project 02'
    ]);
});

app.post('/projects', (request, response) => {
    const body = request.body;
    const {title, owner} = request.body;

    console.log(body);
    console.log(title);
    console.log(owner)

    return response.json([
        'Project 01',
        'Project 02',
        'Project 03'
    ]);
});

app.put('/projects/:id', (request, response) => {
    const params = request.params;
    const { id } = request.params;
    
    console.log(params);
    console.log(id)

    return response.json([
        'Project 04',
        'Project 02',
        'Project 03'
    ]);
});

app.delete('/projects/:id', (request, response) => {
    return response.json([
        'Project 02',
        'Project 03'
    ]);
});

app.listen(3333, () => {
    console.log('😍Back-end started!😍')
});