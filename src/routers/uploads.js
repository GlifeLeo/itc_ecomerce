const express = require("express");
const router = express.Router();
const multer = require("multer");

// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), (req, res) => {
  try {
    console.log(req.file);

    return res.json({
      success: true,
      fileUrl: req.file.path
    });

  } catch (error) {
    console.log(error); // debug
    res.json({
      success: false,
      errMessage: error.message,
    });
  }
});

router.post("/multiple", upload.array("images", 3), (req, res) => {
  try {
    console.log(req.files);

    return res.json({
      success: true,
      fileUrl: ""
    });

  } catch (error) {
    console.log(error); // debug
    res.json({
      success: false,
      errMessage: error.message,
    });
  }
});

module.exports = router;
