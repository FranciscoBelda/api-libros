import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAPIList() {
    return {
      name: 'API-LIST',
      apis: [
        {
          name: 'book-api',
          url: 'https://api-libros-green.vercel.app/v1/books',
        }
      ]
    };
  }
}
