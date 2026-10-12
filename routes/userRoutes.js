const express = require("express");
const router = express.Router();

const { 
    createUser,
    getUsers,
    getUserbyId,

} = require("../controllers/userController")

// Create a new user
router.post("/",createUser);

// get all users
router.get("/",getUsers)

// Get one user by id
router.get("/", getUserbyId)

module.exports = router;