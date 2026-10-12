const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:[true, "User Id is required"],
        },
        title:{
            type:String,
            required:[true, "Expense title is required"],
            trim:true,
        },
        amount:{
            type:Number,
            required:[true, "Amount is required"],
            min:[0.01, "Amount must be greater than zero"],
        },
        category:{
            type:String,
            required:[true, "Category is required"],
            trim:true,
        },
        description:{
            type:String,
            trim:true,
            default:"",
        },
        date:{
            type:Date,
            default:Date.now,
        },
    },
    {
        timestamps:true,
    }
);