const { validationResult } = require('express-validator');
const PostsService = require('../services/PostsService');

/**
 * @description - Login Controller
 * @param { email, password} request 
 * @param {*} response 
 * @returns {void} - void
*/

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


  //--> Call service to register user
  const payload = {
    images: request.files.images,
    description: request.body.description,
    user_id: request.user.id
  }
  const createdPost = await PostsService.create(payload)

  if (createdPost.status) {
    return response.status(200).jsend.success({
      statusCode: 201,
      message: 'Post created successfully',
      data: createdPost.data,
      error_validation: []
    })
  } else {
    return response.status(400).jsend.fail({
      statusCode: 400,
      message: createdPost.error.message,
      error_validation: createdPost.error_validation
    })
  }
}

exports.getAllPosts = async (request, response) => {
  const getPosts = await PostsService.getAllPosts(request.user.id)

  if (getPosts.status) {
    return response.status(200).jsend.success({
      statusCode: 200,
      message: 'Posts retrieved successfully',
      data: getPosts.data,
      error_validation: []
    })
  } else {
    return response.status(400).jsend.fail({
      statusCode: 400,
      message: getPosts.error.message,
      error_validation: getPosts.error_validation
    })
  }
}