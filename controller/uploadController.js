const uploadController = require("express").Router();

const multer = require("multer");
const { verifytoken, verifytokenadmin } = require("../middleware/verifyToken");

const path=require('path')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/images");
  },
  filename: (req, file, cb) => {
    // cb(null, req.body.filename);
    cb(null,Date.now() +path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});

uploadController.post(
  "/image",
  verifytoken,
  upload.single("image"),
  (req, res) => {
    try {
      return res.status(201).json({ message: "successfully uploaded" });
    } catch (error) {
      console.log(error.message);
    }
  }
);

module.exports = uploadController;
