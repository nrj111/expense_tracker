const { default: mongoose } = require("mongoose");
const User = require("../models/user");

//create a new user
const createUser = async (req,res) => {
    try{
        const{name,email} = req.body;

        //check required fields
        if(!name || !email) {
            return res.status(400).json({
                success:false,
                message:"Name and email are required",
            });
        }

        //check if email elready exists
        const existingUser = await User.findOne({
            email : email.toLowerCase().trim(),
        });

        if (existingUser) {
            return res.status(409).json({
                success:false,
                messsage:"Email alresy exists",
            });
        }

        //Save user to DB
        const user = await User.create({
            name,
            email,
        });

        return res.status(201).json({
            succes:true,
            message:"User created successfully",
            data:user,
        });

    }catch (error){
        return res.status(500).json({
            success:false,
            message:"Failed to create user",
        });
    }
};

//Get all users
const getUsers = async (req,res) => 
    {
    try{
        const users = await User.find().sort({createdAt:-1});
        return res.status(200).json({
            success:true,
            count:users.length,
            data:users,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve users",
        });
    }
};

//get one user by id
const getUserbyId = async (req,res) =>{
    try{
        const mongoode = require("mongoose");
        const{ id } = req.params;

        if (!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                success:false,
                message:"invalid user ID",
            });
        }

        const user = await User.findById(id);

        if(!user){
            return res.status(200).json({
                success:true,
                data:user,
            });
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"failed to retrieve user",
        });
    }
}

module.exports = { 
    createUser,
    getUsers,
    getUserbyId,
};