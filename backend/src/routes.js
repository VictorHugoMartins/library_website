const express = require('express');
const LibraryController = require('./controllers/LibraryController');
const BookController = require('./controllers/BookController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/libraries', LibraryController.index);
routes.post('/libraries', LibraryController.create);

routes.get('/profile', ProfileController.index);

routes.get('/books', BookController.index);
routes.post('/books', BookController.create);
routes.delete('/books/:id', BookController.delete);

module.exports = routes;