const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const dbUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password",
  },
];
// get users
router.get("/", async (req, res) => {
  try {
    // lay 10 users dau tien
    const { limit } = req.query;
    const users = await prisma.user.findMany()
    res.json({
      success: true,
      users: users,
      count: users.length,
    });
  } catch (error) {
    console.log(error); // debug
    res.json({
      success: false,
      errMessage: error.message,
    });
  }
});

//get user by id
router.get("/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const user = dbUsers[0]; /// find user by id
    res.json({
      success: true,
      user: user,
      userId: userId, // check
    });
  } catch (error) {
    console.log(error); // debug
    res.json({
      success: false,
      errMessage: error.message,
    });
  }
});

//update user by id
router.put("/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    console.log(userId, name, email, password);
    const user = dbUsers[0]; /// find user by id
    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error); // debug
    res.json({
      success: false,
      errMessage: error.message,
    });
  }
});
router.patch("/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    console.log(userId, name, email, password);
    const user = dbUsers[0]; /// find user by id
    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error); // debug
    res.json({
      success: false,
      errMessage: error.message,
    });
  }
});

// delete user
router.delete("/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const user = dbUsers[0]; /// delete user by id
    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error); // debug
    res.json({
      success: false,
      errMessage: error.message,
    });
  }
});

// create
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    // gia su yeu cau : ko dc trung email
    const existedUser = await prisma.user.findFirst({
      where: {
        email: email
      }
    })

    if (existedUser) {
      return res.json({
        success: false,
        user: null,
        message: "Email already exists ",
      });
    }
    else {
      const created = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        }
      })
      res.json({
        success: true,
        user: created,
      });
    }

  } catch (error) {
    console.log(error); // debug
    res.json({
      success: false,
      errMessage: error.message,
    });
  }
});
module.exports = router;
