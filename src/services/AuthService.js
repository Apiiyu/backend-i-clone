const UsersRepository = require('../repositories/UsersRepository');
const bcrypt = require('bcrypt');
const SALT_ROUND = 10;
const Cloudinary = require('../utils/cloudinary');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
const dotenv = require('dotenv');
dotenv.config();

class AuthService {
  /**
   * @description - Register new user
   * @param { username, email, password, profile_picture } payload 
   * @returns {void}
   */
  static async register(payload) {
    let { email, username, password, profile_picture } = payload;

    try {
      // --> Check if email is already registered
      const { userDataByEmail } = await UsersRepository.getDataByEmail(email);
      if (userDataByEmail) {
        return {
          status: false,
          error: {
            statusCode: 400,
            message: 'Email already exists'
          }, 
          error_validation: [
            {
              msg: 'Invalid value',
              param: 'email',
              location: 'body'
            }
          ]
        }
      }

      // --> Check if username is already registered
      const { userDataByUsername } = await UsersRepository.getDataByUsername(username);
      if (userDataByUsername) {
        return {
          status: false,
          error: {
            statusCode: 400,
            message: 'Username already exists'
          }, 
          error_validation: [
            {
              msg: 'Invalid value',
              param: 'username',
              location: 'body'
            }
          ]
        }
      }

      // --> Hash password
      password = await bcrypt.hash(password, SALT_ROUND);

      // --> Upload profile picture to cloudinary
      const { url } = await Cloudinary.upload(profile_picture);

      // --> Create user
      const { createdUser } = await UsersRepository.create({ email, username, password, profile_picture: url });

      return {
        status: true,
        error: null,
        data: createdUser
      }
    } catch (error) {
      return {
        status: false,
        error: {
          statusCode: 500,
          message: 'Internal server error!'
        }, 
        error_validation: []
      }
    }
  }

  /**
   * @description - Login user
   * @param { email, password } payload 
   * @returns {void}
   */
  static async login(payload) {
    const { email, password } = payload;

    try {
      // --> Check if email is registered
      const { userDataByEmail } = await UsersRepository.getDataByEmail(email);
      if (!userDataByEmail) {
        return {
          status: false,
          error: {
            statusCode: 404,
            message: 'Email not registered'
          }, 
          error_validation: [
            {
              msg: 'Invalid value',
              param: 'email',
              location: 'body'
            }
          ]
        }
      }

      // --> Check if password is correct
      const isPasswordMatch = await bcrypt.compare(password, userDataByEmail.password);
      if (!isPasswordMatch) {
        return {
          status: false,
          error: {
            statusCode: 401,
            message: 'Password is incorrect'
          }, 
          error_validation: [
            {
              msg: 'Invalid value',
              param: 'password',
              location: 'body'
            }
          ]
        }
      }

      // --> Generate token
      const token = jwt.sign({
        id: userDataByEmail.id,
        email: userDataByEmail.email,
      }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      })

      return {
        status: true,
        error: null,
        access_token: token,
        error_validation: []
      }
    } catch (error) {
      return {
        status: false,
        error: {
          statusCode: 500,
          message: 'Internal server error!'
        }, 
        error_validation: []
      }
    }
  }
}

module.exports = AuthService;