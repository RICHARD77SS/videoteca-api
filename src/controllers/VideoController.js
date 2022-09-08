const { v4: uuid } = require('uuid');
const Video = require('../models/video');

module.exports = {
  //controler para rota get
  async index(request, response) {
    try {
      const videos = await Video.find();
      return response.status(200).json({ videos });
    } catch (error) {
      response.status(500).json({ error: error.message })
    }
  },
  // controler para rota post
  async store(request, response) {
    const { title, link } = request.body;

    if (!title || !link) {
      return response.status(400).json({ error: 'Missing title or link.' })
    }
    const video = new Video({
      _id: uuid(),
      title,
      link,
      liked: false,
    });
    try {
      await video.save();
      return response.status(201).json({ message: "Video added succesfully!" })
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },

  // update video data
  async update(request, response) {
    const { title, link } = request.body;

    if (!title && !link) {
      return response
        .status(400)
        .json({ error: "You must inform a now title or a new link" })
    }
    if (title) response.video.title = title; //se tiver um novo title na response muda ele 
    if (link) response.video.link = link; //se tiver um novo link na response muda ele 
    try {
      await response.video.save();
      return response.status(200).json({ message: "Video updated successfully!" })
    } catch (error) {
      response.status(500).json({ error: error.message })
    }
  },
  // Delete video infos
  async delete(request, response) {

    try {
      await response.video.remove();

      return response.status(200).json({ message: "Video deleted successfully!" });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  },


  async updateLike(request, response) {
    response.video.liked = !response.video.liked;
    try {
      await response.video.save();
      return response.status(200).json({
        message: `video ${response.video.liked ? 'liked' : "unliked"} successfully!`
      });
    } catch (error) {
      response.status(400).json({ error: error.message })
    }
  }
}