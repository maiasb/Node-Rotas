const express = require('express');

const app = express();

app.get('/projects', (request, response) => {
    return response.json({ message: 'Hello World!' });
});

app.get('/teste', (request, response) => {
    return response.json({ message: 'Fodac' });
});

app.listen(3333, () => {
    console.log('😍Back-end started!😍')
});