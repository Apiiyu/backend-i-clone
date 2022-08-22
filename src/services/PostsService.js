const Cloudinary = require('../utils/cloudinary');
const PostsRepository = require('../repositories/PostsRepository');

class PostsService {
  static async create(payload) {
    const { images, description, user_id } = payload;
    
    try {
      const imageCollections = []

      console.log(images, 'images');
      await Promise.all(
        await images.map(async (image) => {
          const { url } = await Cloudinary.upload(image)
          console.log(image, 'image');
          imageCollections.push(url)
        })
      );
      console.log(imageCollections, 'image collections');

      const { createdPost } = await PostsRepository.create({ images: imageCollections, description, user_id });

      return {
        status: true,
        error: null,
        data: createdPost
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

  static async getAllPosts(user_id) {
    try {
      const { posts } = await PostsRepository.getAllData(
        { user_id }
      );

      return {
        status: true,
        error: null,
        data: posts
      };
    } catch (err) {
      return {
        status: false,
        error: {
          code: 500,
          message: err.message,
        },
      };
    }
  }
}

module.exports = PostsService;