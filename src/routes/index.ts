
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

/**
 * Middleware:
 * 
 * Interceptador de requisições que intemrrompe totalmente a requisição
 * ou alterar os dados da requisição;
 */

// LIBS
import { Router } from "express";

// Função da lib para o recebimento de id's
const { uuid, isUuid } = require('uuidv4');

const routes = Router();

// Array de projects
const projects: Array<object> = [];

routes.get('/projects', (request, response) => {
    // Parâmetros recebidos do recurso
    const { title } = request.query;

    // Verifica em cada projeto do array, se existe a palavra enviada no parâmetro do title
    // Pesquisar sobre
    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    // Lista todos os projetos com o title incluso
    return response.json(results);
});

routes.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    // Gera o id
    const project: object = { id: uuid(), title, owner };

    // Adiciona o projeto criado no array
    projects.push(project);
    console.log(projects)

    return response.json(project);
});

routes.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    // Busca nos arrays o id enviado pelo recurso
    const projectIndex = projects.findIndex(project => project.id === id);

    // Mensagem de erro caso o id não exista
    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    }

    // Declaração do projeto
    const project: object = {
        id: Number,
        title: String,
        owner: String
    }

    projects.push(project)
    console.log(projects)

    return response.json(project);
});

routes.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

export default routes;