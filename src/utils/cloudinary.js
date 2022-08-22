const cloudinary = require('../../configs/cloudinary')

class Cloudinary {
  static async upload(payload) {
    const fileBase64 = payload.buffer.toString('base64');
    const file = `data:${payload.mimetype};base64,${fileBase64}`;
    const cloudinaryImage  = await cloudinary.uploader.upload(file)

    return cloudinaryImage
  }
}

module.exports = Cloudinary;