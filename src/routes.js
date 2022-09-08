const express = require('express');
const routes = express.Router();

const VideoController = require('./controllers/VideoController');
const VideoMiddleware = require('./middlewares/VideoMiddleware');

routes.get('/', (request, response) => response.send('Hello world'));
routes.get('/videos', VideoController.index)//acessa a funçao index em video controller e faz um get nos videos 
routes.post('/videos', VideoController.store);
routes.put('/videos/:id', VideoMiddleware.validateId, VideoController.update);
routes.delete('/videos/:id', VideoMiddleware.validateId, VideoController.delete);
routes.patch('/videos/:id', VideoMiddleware.validateId, VideoController.updateLike);

module.exports = routes