import { createContext, useContext, useState, useEffect } from 'react';

const BookContext = createContext(undefined);

export function BookProvider({ children }) {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('book-tracker-data');
    if (savedBooks) {
      try {
        return JSON.parse(savedBooks);
      } catch (e) {
        console.error("Failed to parse books from local storage", e);
      }
    }
    // Return sample data if nothing in local storage
    return [
      {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        status: 'Finished', // Want to Read, Reading, Finished
        rating: 5,
        coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop',
        dateAdded: new Date(Date.now() - 86400000 * 5).toISOString(),
        pages: 218,
      },
      {
        id: '2',
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        status: 'Reading',
        rating: 0,
        coverUrl: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop',
        dateAdded: new Date(Date.now() - 86400000 * 2).toISOString(),
        pages: 496,
      },
      {
        id: '3',
        title: 'Atomic Habits',
        author: 'James Clear',
        status: 'Want to Read',
        rating: 0,
        coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop',
        dateAdded: new Date().toISOString(),
        pages: 320,
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('book-tracker-data', JSON.stringify(books));
  }, [books]);

  const addBook = (newBook) => {
    setBooks(prev => [{ ...newBook, dateAdded: new Date().toISOString() }, ...prev]);
  };

  const updateBookStatus = (id, newStatus) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, status: newStatus } : book
    ));
  };

  const updateBookRating = (id, newRating) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, rating: newRating } : book
    ));
  };

  const deleteBook = (id) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  const updateBook = (updatedBook) => {
    setBooks(prev => prev.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    ));
  }

  const value = {
    books,
    addBook,
    updateBookStatus,
    updateBookRating,
    deleteBook,
    updateBook
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}
