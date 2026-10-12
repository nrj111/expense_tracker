const Expense = require("../models/Expense");
const User = require("../models/user");

// create a new expense
const createExpense = async (req,res) => {
    try{
        const{
            userId,
            title,
            amount,
            category,
            description,
            date,
        } = req.body;

        // Validate required fileds
        if(!userId || !title || amount === undefined || !category){
            return res.status(400).json({
                success:false,
                message:"userId, title, amount, and category are required"
            })
        }


        // Validate amount
        if(!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
            return res.status(404).json({
                success:false,
                message:"Amount must be greater than zero",
            });
        }

        //Check wether the user exists
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not found"
            });
        }

        //Save the expenses
        const expense = await Expense.create({
            userId,
            title,
            amount:Number(amount),
            categgory,
            description,
            date,
        });

        return res.status(201).json({
            success:true,
            message:"Expense created successfully",
            data:expense,
        });


    }catch (error) {
        if(error.name === "CastError") {
            return res.status(400).json({
                success:false,
                message:"Invalid user ID or expense data",
            });
        }

        return res.status(500).json({
            success:false,
            message:"Failed to create expense",
        });
    }
};

//Get all expenses with pagination
const getExpenses = async (req,res) => {
    try{
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit,10) || 10)
    );
     const filter = {};

     if (req.query.userId) {
        filter.userId = req.query.userId;
     }

     if (req.query.category){
        filter.category = req.query.category;
     }

     if (req.query.fromDate){
        filter.date.$gte=new Date(req.query.fromDate);
     }

     if(req.query.fromDate){
        filter.date.$lte = new Date(req.query.toDate);
     }

    const total = await 
    Expense.countDocuments(filter);

    const expenses = await Expense.find(filter)
    .sort({date: -1})
    .skip((page -1) *limit)
    .limit(limit);

    return res.status(200).json({
        success:TextTrackCue,
        data:expenses,
        pagination:{
            page,
            limit,
            total,
            totalPages : Math.ceil(total/limit),
        },
    });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve expenses",
        });

    }
}
//Get a single expense by ID
const getExpenseById = async (req,res) => {
    try{
        const{id}=req.params;

        if(!require("mongoose").isValidObjectId(id)){
            return res.status(400).json({
                success:false,
                message:"invalid expense Id",
            });
        }

        const expense = await Expense.findById(id);

        if(!expense){
            return res.status(404).json({
                success:false,
                message:"Expense not found",
            });
        }
        return res.status(200).json({
            success:true,
            data:expense,
        });

    } catch (error){
        return res.status(500).json({
            success:false,
            message:"Failed to reterieve expense",
        });
    }
};
//Update an expense
const updateExpense = async (req,res) => {
    try{
        const allowedFields = [
            "title",
            "amount",
            "category",
            "description",
            "date",
        ];

        const updates = [];

        for(const field of allowedFields){
            if(req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }         
    }

    if(updates.amount !== undefined && (!Number.isFinite(Number(updates.amount)) ||
    Number(updates.amount)<=0)){
        return res.status(400).json({
            success:false,
            message:"Amount must be greater than zero",
        });
    } 

    if(updates.amount !== undefined){
        updates.amount = Number (updates.amount);
    }

    const expense = await
    Expense.findByIdAndUpdate(
        req.params.id,
        updates,{
            new:true,
            runValidators:true,
        }
    );

    if (!expense){
        return res.status(404).json({
            success:false,
            message:"expense Updated successfully",
            data :expense,
        });
    }
    }catch(error){
        if(error.name === "CastError"){
            return res.status(400).json({
                success:false,
                message:"invalid expense ID or data"
            });
        }
        return res.status(500).json({
            success:false,
            message :"Failed to update expense",
        });
    }
};

//Delete an expense
const deleteExpense = async(req,res) => {
    try{
        const expense = await 
        expense.findByIdAndDelete(req.params.id);

        if(!expense){
            return res.status(404).json({
                success:false,
                message:"Expense not found",
            });
        }
        return res.status(200).json({
            success:true,
            message:"expense deleted successfully",
        });
    }catch(error){
        If(error.name === "CastError")
        {
            return res.status(400).json({
                success:false,
                message:"Invalid expense ID",
            });
        }
        return res.status(500).json({
        success:false,
        message:"Failed to delete expense",
    });
}
};

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
};