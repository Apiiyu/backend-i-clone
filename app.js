const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jsend = require('jsend');
const dotenv = require('dotenv');

const app = express()
dotenv.config() // load .env file
const router = express.Router()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(jsend.middleware);

const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 8000

const PREFIX = '/api/v1'
const authRouter = require('./src/routes/auth')
const postRouter = require('./src/routes/posts')
const postLikesRouter = require('./src/routes/postLikes')

// Initialize routes
app.use(`${PREFIX}/auth`, authRouter)
app.use(`${PREFIX}/posts`, postRouter)
app.use(`${PREFIX}/posts/likes`, postLikesRouter)

server.listen(port, () => {
  console.log(`Server is already running at http://localhost:${port}`);
})