// LIBS
const { json } = require('express');
const express = require('express');
// Função da lib para o recebimento de id's
const { uuid } = require('uuidv4');

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

// Array de projects
const projects = [];

app.get('/projects', (request, response) => {
    // Recebimento do parâmetro do recurso
    const { title } = request.query;

    // Verifica em cada projeto, dos projetos, se existe a palavra enviada no parâmetro do title
    // Pesquisar sobre
    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    // Lista todos os projetos
    return response.json(results);
});

app.post('/projects', (request, response) => {
    // Parâmetros recebidos do recurso
    const { title, owner } = request.body;

    // Gera o id
    const project = { id: uuid(), title, owner };

    // Adiciona o projeto criado no array
    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    // Parâmetros recebidos do recurso
    const { id } = request.params;
    const { title, owner } = request.body;

    // Busca nos arrays o id enviado pelo recurso
    const projectIndex = projects.findIndex(project => project.id === id);

    // Mensagem de erro caso o id não exista
    if (projectIndex < 0) {
        return response.status(400).json({ 'error': 'Project not found.' })
    }

    // Declaração do projeto
    const project = {
        id,
        title,
        owner
    }

    // Adicionando o projeto no array
    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ 'error': 'Project not found.' })
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('😍Back-end started!😍')
});