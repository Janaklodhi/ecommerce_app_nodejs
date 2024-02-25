const express = require("express");
const imageController = require("../controllers/image.controller");
const imageUploader = require("../helpers/image-uploader"); // Ensure correct filename

const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post(
  "/upload",
  checkAuth.checkAuth,
  imageUploader.single("file"), // Use single() instead of upload.single()
  imageController.upload
);

module.exports = router;
