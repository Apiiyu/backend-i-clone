const dbConnection = require('../../configs/connection');

class UsersRepository {
  static async create(payload) {
    const { email, username, password, profile_picture } = payload;

    const createUser = await dbConnection.query(
      'INSERT INTO users (email, username, profile_picture, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, username, profile_picture, password]
    )

    return {
      createdUser: createUser.rows[0]
    }
  }

  static async getDataById(payload) {
    const { id } = payload;
    const getData = await dbConnection.query(
      'SELECT * FROM users WHERE id = $1', [id]
    )

    return {
      userDataById: getData.rows[0]
    }
  }

  static async getDataByEmail(payload) {
    const getData = await dbConnection.query(
      'SELECT * FROM users WHERE email = $1', [payload]
    )

    return {
      userDataByEmail: getData.rows[0]
    }
  }

  static async getDataByUsername(payload) {
    const { username } = payload;
    const getData = await dbConnection.query(
      'SELECT * FROM users WHERE username = $1', [username]
    )

    return {
      userDataByUsername: getData.rows[0]
    }
  }
}

module.exports = UsersRepository;