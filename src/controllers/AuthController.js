const { validationResult } = require('express-validator');
const AuthService = require('../services/AuthService');

/**
 * @description - Login Controller
 * @param { email, password} request 
 * @param {*} response 
 * @returns {void} - void
*/

exports.login = async (request, response) => {
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
  const loginResponse = await AuthService.login(request.body)

  if (loginResponse.status) {
    return response.status(200).jsend.success({
      statusCode: 200,
      message: 'User logged in successfully',
      access_token: loginResponse.access_token,
      error_validation: []
    })
  } else {
    return response.status(400).jsend.fail({
      statusCode: 400,
      message: loginResponse.error.message,
      error_validation: loginResponse.error_validation
    })
  }
}

/**
 * @description - Register Controller
 * @param { username, email, password, file } request 
 * @param {*} response 
 * @returns {void} - void
*/

exports.register = async (request, response, next) => {
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
  const { email, username, password } = request.body;
  const registerResponse = await AuthService.register({ email, username, password, profile_picture: request.file })

  if (registerResponse.status) {
    return response.status(201).jsend.success({
      statusCode: 201,
      message: 'User created',
      data: registerResponse.data,
      error_validation: []
    })
  } else {
    return response.status(400).jsend.fail({
      statusCode: 400,
      message: registerResponse.error.message,
      error_validation: registerResponse.error_validation
    })
  }
}

/**
 * @description - Logged User Controller
 * @param {*} request 
 * @param {*} response 
 * @returns {void} - void
*/

exports.getLoggedUser = async (request, response) => {
  return response.jsend.success({
    statusCode: 200,
    message: 'User logged in successfully',
    data: request.user,
    error_validation: []
  })
}