import { Injectable } from '@angular/core';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Book } from './book';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private firestore: Firestore) { }

  async getBooks() {
    const booksCol = collection(this.firestore, 'books');
    const bookSnapshot = await getDocs(booksCol);
    const bookList: Book[] = bookSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Book));
    return bookList;
  }

  async getBook(id: string) {
    const bookRef = doc(this.firestore, 'books', id);
    const bookSnapshot = await getDoc(bookRef);
    if (bookSnapshot.exists()) {
      const bookData = bookSnapshot.data() as {authorId: string, genreId: string, title: string};
      const authorRef = doc(this.firestore, 'authors', bookData.authorId);
      const authorSnapshot = await getDoc(authorRef);
      const authorData = authorSnapshot.data();
      const genreRef = doc(this.firestore, 'genres', bookData.genreId);
      const genreSnapshot = await getDoc(genreRef);
      const genreData = genreSnapshot.data();
      return {
        id: bookSnapshot.id,
        ...bookData,
        author: authorData,
        genre: genreData,
      };
    } else {
      throw new Error('No book found with the provided id');
    }
  }
  
  
  

  async getAuthors() {
    const authorsCol = collection(this.firestore, 'authors');
    const authorSnapshot = await getDocs(authorsCol);
    const authorsList = authorSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return authorsList;
  }
  
  async getGenres() {
    const genresCol = collection(this.firestore, 'genres');
    const genreSnapshot = await getDocs(genresCol);
    const genreList = genreSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return genreList;
  }
  

  async addBook(book: Partial<Book>) {
    const booksCol = collection(this.firestore, 'books');
    const docRef = await addDoc(booksCol, book);
    return docRef.id;
    
  }

  async updateBook(id: string, book: Partial<Book>) {
    const bookRef = doc(this.firestore, 'books', id);
    await updateDoc(bookRef, book);
  }

  async deleteBook(id: string) {
    const bookRef = doc(this.firestore, 'books', id);
    await deleteDoc(bookRef);
  }
}
