const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Home route
app.get("/", (req,res)=> {
    res.send("Expense management API is running");
});

//Helth check route
app.get("/health", (req,res)=> {
    res.json({
        success:true,
        message:"Server is healthy",
    });
});

//API Routes
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

//Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try{
        await connectDB();
        console.log("About to start:",PORT);
        app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
});
    }catch(error){
        console.error("Failed to start server",
        error.message
        );
        process.exit(1);
    }
}

startServer();

