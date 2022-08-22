const dbConnection = require('../../configs/connection');

class PostLikesRepository {
  static async create(payload) {
    const { post_id, user_id } = payload;

    const createPostLike = await dbConnection.query(
      'INSERT INTO post_likes (post_id, user_id) VALUES ($1, $2) RETURNING *',
      [post_id, user_id]
    )

    return {
      createdPostLike: createPostLike.rows[0]
    }
  }

  static async delete(payload) {
    const { post_id, user_id } = payload;

    const deletePostLike = await dbConnection.query(
      'DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2',
      [post_id, user_id]
    )

    return {
      deletedPostLike: deletePostLike.rows[0]
    }
  }
}

module.exports = PostLikesRepository;