const express = require('express');
const app = express();
const path = require('path');
const store = require('bad-store');
const publicDir = path.join(__dirname, '../public');

app.get('/public', (req, res) => {
    store.all()
    .then (pubData => res.send(pubData))
    .catch(err => console.log(err));
})

app.get('/public/:id', (req, res) => {
    store.get(req.params.id)
    .then(pubData => res.send(pubData))
    .catch(err => console.log(err));
})

app.delete('/public/:id', (req, res) => {
    store.remove(req.params.id)
        .then(result => res.send({ results: result }))
        .catch(err => console.log(err));
})

app.post('/public', (req, res) => {

    let body = '';
    req.on('data', data => body += data);
    req.on ('end', () => {
        store.save(JSON.parse(body))
            .then(id => res.send({ id: id }))
            .catch(err => console.log(err))
    });
});

module.exports = app;