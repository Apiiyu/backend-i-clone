const { validationResult } = require('express-validator');
const PostLikesService = require('../services/PostLikesService');

exports.create = async (request, response) => {
  //--> Validate request body
  const errors = validationResult(request.body);
  if (!errors.isEmpty()) {
    return response.status(400).jsend.fail({
      statusCode: 400,
      message: null,
      error_validation: errors.array()
    })
  }

  const payload = {
    post_id: request.body.post_id,
    user_id: request.user.id
  }

  const getPostLikes = await PostLikesService.create(payload)

  if(getPostLikes.status) {
    return response.status(200).jsend.success({
      statusCode: 200,
      message: 'Post liked successfully',
      data: getPostLikes.data,
      error_validation: []
    })
  } else {
    return response.status(400).jsend.fail({
      statusCode: 400,
      message: getPostLikes.error.message,
      error_validation: getPostLikes.error_validation
    })
  }
}

exports.deleteData = async (request, response) => {
  const payload = {
    post_id: request.params.post_id,
    user_id: request.user.id
  }

  const deletedPostLikes = await PostLikesService.delete(payload)

  if(deletedPostLikes.status) {
    return response.status(200).jsend.success({
      statusCode: 200,
      message: 'Unliked posts successfully',
      data: deletedPostLikes.data,
      error_validation: []
    })
  } else {
    return response.status(400).jsend.fail({
      statusCode: 400,
      message: deletedPostLikes.error.message,
      error_validation: deletedPostLikes.error_validation
    })
  }
}