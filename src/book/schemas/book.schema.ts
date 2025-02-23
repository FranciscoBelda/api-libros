import { Schema } from 'mongoose';
import { BookDocument } from "../interface/book.interface";

export const BookSchema: Schema = new Schema<BookDocument>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true }
  },
  { versionKey: false, timestamps: true },
);
