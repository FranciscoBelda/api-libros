import {
  BadRequestException,
  Body,
  Controller,
  Delete, Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post, Put, Query
} from "@nestjs/common";
import { BookService } from "./book.service";
import { BookDto } from "./dto/book.dto";
import { PaginationDto } from "./dto/pagination.dto";

@Controller('v1/books')
export class BookController {
  constructor(private readonly bookService: BookService) {
  }

  @Get('')
  loadInfo(){
    return{
      endpoints: {
        GetAll: {
          function: 'GET',
          endpoint: '/v1/books/get/all',
        },
        GetAllPaginated: {
          function: 'GET',
          endpoint: '/v1/books/get/all-paginated?page=1&limit=10',
        },
        GetOne: {
          function: 'GET',
          endpoint: '/v1/books/get/one-book/id',
        },
        GetByTitle: {
          function: 'GET',
          endpoint: '/v1/books/get/search?title=bookTitle&page=1&limit=10',
        },
        Add: {
          function: 'POST',
          endpoint: '/v1/books/add',
        },
        UpdatePut: {
          function: 'PUT',
          endpoint: '/v1/books/update/put/id',
        },
        UpdatePatch: {
          function: 'PATCH',
          endpoint: '/v1/books/update/patch/id',
        },
        Delete: {
          function: 'DELETE',
          endpoint: '/v1/books/delete/id',
        },
        GetGenres: {
          function: 'GET',
          endpoint: '/v1/books/get/genres',
        },
      }
    }
  }

  @Post('add')
  async addBook(@Body() bookDto: BookDto) {
    try {
      const resp = await this.bookService.addBook(bookDto);
      return {
        ok: true,
        message: 'Book Successfully created'
      }
    } catch (e: any) {
      if (e instanceof BadRequestException){
        throw new BadRequestException(
          {
            ok: false,
            message: e.message
          })
      }
      throw new InternalServerErrorException({
        ok: false,
        message: e.message
      })

    }
  }


  @Get('get/all')
  async getBooks() {
    try {
      const data =
        await this.bookService.getBooks();
      return {
        ok: true,
        data
      }
    }catch (e: any) {
      if (e instanceof BadRequestException){
        throw new BadRequestException(
          {
            ok: false,
            message: e.message
          })
      }
      throw new InternalServerErrorException({
        ok: false,
        message: e.message
      })

    }
  }


  @Get('get/all-paginated')
  async getBooksPaginated(
    @Query()paginationDto:PaginationDto) {
    try {
      const {page,limit} = paginationDto;
      const data =
        await this.bookService.getBooksPaginated(
          page,limit
        );
      return {
        ok:true,
        ...data
      }
    } catch (e: any) {
      if (e instanceof BadRequestException){
        throw new BadRequestException(
          {
            ok: false,
            message: e.message
          })
      }
      throw new InternalServerErrorException({
        ok: false,
        message: e.message
      })

    }
  }

  @Get('get/one-book/:id')
  async getBook(@Param('id') id: string) {
    try {
      const data =
        await this.bookService.getBook(id);
      if (data) {
        return {
          ok: true,
          data
        }
      }
      throw new NotFoundException({
        ok:false,
        message: 'Book not found'
      })
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException({
          ok: false,
          message: e.message
        })
      }
        if (e instanceof BadRequestException){
          throw new BadRequestException(
            {
              ok: false,
              message: e.message
            })
        }
        throw new InternalServerErrorException({
          ok: false,
          message: e.message
        })

      }
  }

  @Get('get/genres')
  async getGenres() {
    try {
      const data =
        await this.bookService.getGenres();

      return {
        ok: true,
        data
      }
    } catch (e: any) {
      if (e instanceof BadRequestException){
        throw new BadRequestException(
          {
            ok: false,
            message: e.message
          })
      }
      throw new InternalServerErrorException({
        ok: false,
        message: e.message
      })

    }
  }

  // URLParams = http://www.pepito.com/books/valor/valor
  // URLQuery = http://www.pepito.com/books?variable=valor&variable2=valor
  @Get('get/search')
  async getBookByName(@Query('title') title: string,
                      @Query()paginationDto:PaginationDto) {
    try {
      return await this.bookService.getBooksByTitle(title, paginationDto.page, paginationDto.limit);
    }  catch (e: any) {
      if (e instanceof BadRequestException){
        throw new BadRequestException(
          {
            ok: false,
            message: e.message
          })
      }
      throw new InternalServerErrorException({
        ok: false,
        message: e.message
      })

    }
  }

  @Put('update/put/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() bookDto: BookDto) {
    try {
      const updatedBook =
        await this.bookService.updateBook(
          id, bookDto
        );
      if (!updatedBook) {
        throw new NotFoundException({
          ok:false,
          message: 'Book not found'
        })
      }
      return {
        ok:true,
        message: 'Book updated'
      }
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException({
          ok: false,
          message: e.message
        })
      }
      if (e instanceof BadRequestException){
        throw new BadRequestException(
          {
            ok: false,
            message: e.message
          })
      }
      throw new InternalServerErrorException({
        ok: false,
        message: e.message
      })

    }
  }


  @Put('update/put/:id')
  async updatePatchBook(
    @Param('id') id: string,
    @Body() bookDto: Partial<BookDto>) {
    try {
      const updatedBook =
        await this.bookService.updatePatchBook(
          id, bookDto
        );
      if (!updatedBook) {
        throw new NotFoundException({
          ok:false,
          message: 'Book not found'
        })
      }
      return {
        ok:true,
        message: 'Book updated'
      }
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException({
          ok: false,
          message: e.message
        })
      }
      if (e instanceof BadRequestException){
        throw new BadRequestException(
          {
            ok: false,
            message: e.message
          })
      }
      throw new InternalServerErrorException({
        ok: false,
        message: e.message
      })

    }
  }

  @Delete('/delete/:id')
  async deleteBook(@Param('id') id: string) {
    try {
      const deletedBook =
        await this.bookService.deleteBook(id);
      if (!deletedBook) {
        throw new NotFoundException({
          ok:false,
          message: 'Book not found'
        })
      }
      return {
        ok: true,
        message: 'Book deleted'
      }
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException({
          ok: false,
          message: e.message
        })
      }
      if (e instanceof BadRequestException){
        throw new BadRequestException(
          {
            ok: false,
            message: e.message
          })
      }
      throw new InternalServerErrorException({
        ok: false,
        message: e.message
      })

    }
  }

}
