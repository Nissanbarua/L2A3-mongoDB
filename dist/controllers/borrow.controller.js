"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const Book_1 = require("../models/Book");
const Borrow_1 = require("../models/Borrow");
const borrowBook = async (req, res) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await Book_1.Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        await book.borrowCopies(quantity); // <-- instance method
        const borrow = await Borrow_1.Borrow.create({
            book: bookId,
            quantity,
            dueDate,
        });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to borrow book",
            error: error.message,
        });
    }
};
exports.borrowBook = borrowBook;
const getBorrowSummary = async (req, res) => {
    try {
        const summary = await Borrow_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo",
                },
            },
            {
                $unwind: "$bookInfo",
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn",
                    },
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to retrieve borrow summary",
            error: error.message,
        });
    }
};
exports.getBorrowSummary = getBorrowSummary;
