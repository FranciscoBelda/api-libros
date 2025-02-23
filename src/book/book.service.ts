import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./interface/book.interface";
import { Model } from "mongoose";
import { BookDto } from "./dto/book.dto";
import { InfoData } from "./interface/info-data.interface";

@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book')
    private bookModel: Model<Book>) {
  }

  async addBook(bookDto: BookDto):Promise<any>{
    const book = new this.bookModel(bookDto);
    return book.save();
  }

  async getBooks(): Promise<Book[]>{
    return this.bookModel.find();
  }
  async getBooksPaginated(
    page: number,
    limit: number): Promise<{ data: Book[],info: InfoData }>{
    const skip = (page - 1)*limit;

    const books = await this.bookModel.find()
      .skip(skip)
      .limit(limit)
      .exec();

    const total =
      await this.bookModel.countDocuments();

    const totalPages = Math.ceil(total /limit);
    return {
      data:books,
      info: {
        total,
        pageSize: limit,
        page,
        totalPages: totalPages
      }
    }
  }

  async getBook(idBook: string):Promise<Book | null>{
    return this.bookModel.findById(idBook);
  }

  async getBooksByTitle(name: string,
                      page: number,
                      limit: number): Promise<{data: Book[], info: InfoData}>{

    const skip = (page - 1)*limit;
    const regex = new RegExp(name,'i');

    const books = await this.bookModel.find(
      {title: {$regex: regex}})
      .skip(skip)
      .limit(limit)
      .exec();

    const total =
      await this.bookModel.countDocuments();

    const totalPages = Math.ceil(total /limit);
    return {
      data:books,
      info: {
        total,
        pageSize: limit,
        page,
        totalPages: totalPages
      }
    }

  }

  async updateBook(id:string,bookDto: BookDto):Promise<Book | null>{
    return this.bookModel.findByIdAndUpdate(
      id,
       bookDto,
      {new: true}
    )
  }
  async updatePatchBook(id:string,bookDto: Partial<BookDto>):Promise<Book | null>{
    return this.bookModel.findByIdAndUpdate(
      id,
      {$set: bookDto},
      {new: true}
    )
  }

  async deleteBook(idBook: string): Promise<Book | null>{
    //return this.bookModel.findByIdAndDelete(idBook);
    return this.bookModel.findById(idBook);
  }

  async getGenres():Promise<string[]>{
    return this.bookModel.find().distinct('genre');
  }

}
