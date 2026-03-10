import { useState, useMemo } from 'react';
import FilterBar from '../components/FilterBar';
import BookList from '../components/BookList';
import { useBooks } from '../context/BookContext';

export default function Library() {
  const { books } = useBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // 1. Filter by status
      if (filterStatus !== 'All' && book.status !== filterStatus) return false;
      
      // 2. Filter by search query (title or author)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          book.title.toLowerCase().includes(query) || 
          book.author.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  }, [books, searchQuery, filterStatus]);

  return (
    <div className="animate-fade-in min-h-[70vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-extrabold text-slate-900 mb-2">My Library</h1>
        <p className="text-slate-500">Browse and manage your entire book collection.</p>
      </div>

      <FilterBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <BookList 
        books={filteredBooks} 
        emptyMessage={
          searchQuery || filterStatus !== 'All' 
            ? "No books match your current filters. Try relaxing your search." 
            : "Your library is empty. Go to the Add Book page to get started."
        } 
      />
    </div>
  );
}
