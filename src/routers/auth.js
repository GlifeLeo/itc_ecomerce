const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

router.post("/login", (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

router.post("/forgot-password", (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

module.exports = router;