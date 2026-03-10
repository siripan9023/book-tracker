import BookCard from './BookCard';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BookList({ books, title, emptyMessage }) {
  if (books.length === 0) {
    return (
      <div className="w-full">
        {title && <h2 className="text-2xl font-bold mb-6 text-slate-800">{title}</h2>}
        <div className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center animate-fade-in-up">
          <div className="bg-slate-100 p-4 rounded-full mb-4 text-slate-400">
            <BookOpen size={48} />
          </div>
          <h3 className="text-xl font-heading font-semibold text-slate-700 mb-2">No Books Found</h3>
          <p className="text-slate-500 max-w-sm mb-6">
            {emptyMessage || "You haven't added any books yet."}
          </p>
          <Link to="/add" className="btn-primary">
            Add Your First Book
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          <span className="badge badge-want-to-read opacity-80">{books.length} Books</span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <BookCard key={book.id} book={book} index={index} />
        ))}
      </div>
    </div>
  );
}
