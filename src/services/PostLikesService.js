const PostLikesRepository = require("../repositories/PostLikesRepository");

class PostLikesService {
  static async create(payload) {
    const { post_id, user_id } = payload;

    try {
      const { createdPostLike } = await PostLikesRepository.create({ post_id, user_id });

      return {
        status: true,
        error: null,
        data: createdPostLike
      }
    } catch (error) {
      return { 
        status: false,
        error: {
          statusCode: 500,
          message: 'Internal server error!'
        }
      }
    }
  }

  static async delete(payload) {
    const { post_id, user_id } = payload;

    try {
      const { deletedPostLike } = await PostLikesRepository.delete({ post_id, user_id });

      return {
        status: true,
        error: null,
        data: deletedPostLike
      }
    } catch (error) {
      return { 
        status: false,
        error: {
          statusCode: 500,
          message: 'Internal server error!'
        }
      }
    }
  }
}

module.exports = PostLikesService;