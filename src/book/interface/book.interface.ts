export interface Book {
  title: string,
  image: string,
  year: number,
  genre: string,
  author: string,
  price: number,
}
export interface BookDocument extends Book, Document {}
