const { body } = require("express-validator");
const { authenticate } = require("../middlewares/authentication");
const { create, deleteData } = require("../controllers/PostLikesController");

const express = require("express");
const router = express.Router();

router.post(
  "/",
  authenticate,
  body("post_id").isNumeric(),
  create
);
router.delete("/:post_id", authenticate, deleteData );

module.exports = router;