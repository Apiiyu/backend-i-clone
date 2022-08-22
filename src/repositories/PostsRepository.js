const dbConnection = require('../../configs/connection');

class PostsRepository {
  static async create(payload) {
    const { images, description, user_id } = payload;
    const createPost = await dbConnection.query(
      'INSERT INTO posts (images, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [images, description, user_id]
    )

    return {
      createdPost: createPost.rows[0]
    }
  }

  static async getAllData(payload) {
    const { user_id } = payload;
    const getPosts = await dbConnection.query(
     `SELECT
        posts.id, posts.user_id, posts.images, posts.description, posts.created_at,
        users.username AS user_name, users.profile_picture AS user_profile_picture,
        user_post_likes.id AS is_user_liked,
        (SELECT COUNT(*) FROM post_likes WHERE post_id = posts.id) AS total_likes
      FROM posts
      JOIN users ON users.id = posts.user_id
      LEFT JOIN post_likes AS user_post_likes ON user_post_likes.post_id = posts.id AND user_post_likes.user_id = $1`,
      [user_id])

    return {
      posts: getPosts.rows
    }
  }
}

module.exports = PostsRepository;