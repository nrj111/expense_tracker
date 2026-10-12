const express = require("express");
const router = express.Router();


const {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
}= require("../controllers/expenseController");

// Create an expense -- POST /expenses
router.post("/", createExpense);

// Get expense with filtering and pagination --GET /expenses
router.get("/", getExpenses)

// Get one expense by ID
router.get("/:id", getExpenseById);

//update an expense by id
router.put("/:id",updateExpense)

//delete one expense by id
router.delete("/:id",deleteExpense)

module.exports = router;