const express = require('express');
const LibraryController = require('./controllers/LibraryController');
const BookController = require('./controllers/BookController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

const upload = require("multer")();

routes.post('/sessions', SessionController.create)

routes.get('/libraries', LibraryController.index);
routes.post('/libraries', LibraryController.create);

routes.get('/profile', ProfileController.index);

routes.get('/books', BookController.index);
routes.post('/books', BookController.create);
routes.delete('/books/:id', BookController.delete);

routes.post('/send', upload.single('anexo'), (req, res, next) => { 
    const nome = req.body.nome;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    const anexo = req.file;
    require("./nodemail")(email, nome, mensagem, anexo)
        .then(response => res.json(response))
        .catch(error => res.json(error));
})

module.exports = routes;