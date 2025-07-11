import { Request, Response } from "express";
import { Book } from "../models/Book";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({
      message: "Book created successfully",
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
};
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;

    const query: any = {};

    if (filter) {
      query.genre = filter;
    }

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error,
    });
  }
};
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch book",
      error,
    });
  }
};
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true, // return the updated document
      runValidators: true, // enforce schema validation on update
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error,
    });
  }
};
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error,
    });
  }
};
