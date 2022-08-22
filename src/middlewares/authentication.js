const jwt = require("jsonwebtoken");
const UsersRepository = require("../repositories/UsersRepository");

const { JWT_SECRET } = process.env;

exports.authenticate = async (request, response, next) => {
  const authHeader = request.get("Authorization");
  let token;

  if (authHeader && authHeader.startsWith("Bearer"))
    token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const { userDataById } = await UsersRepository.getDataById({
      id: decodedToken.id,
    });

    request.user = userDataById;
    next();
  } catch (err) {
    return response.status(401).jsend.fail({
      code: 401,
      message: 'Your session has expired. Please login again',
    });
  }
};