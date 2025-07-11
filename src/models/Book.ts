import mongoose, { Schema, Document } from "mongoose";

export enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  isAvailable(): boolean; // Instance method
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, enum: Object.values(Genre), required: true },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Instance Method
bookSchema.methods.borrowCopies = async function (quantity: number) {
  if (this.copies < quantity) {
    throw new Error('Not enough copies available to borrow.');
  }
  this.copies -= quantity;
  if (this.copies === 0) {
    this.available = false;
  }
  await this.save();
};

// Middleware: pre-save to update availability
bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

interface IBookDocument extends mongoose.Document {
  borrowCopies(quantity: number): Promise<void>;
}

export const Book = mongoose.model<IBookDocument>('Book', bookSchema);
