const express = require('express');
const routes = express.Router();

const VideoController = require('./controllers/VideoController');

routes.get('/', (request, response) => response.send('Hello world'));
routes.get('/videos', VideoController.index)//acessa a funçao index em video controller

module.exports = routes