import { useBooks } from '../context/BookContext';
import { Star, BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

export default function BookCard({ book, index }) {
  const { updateBookStatus, updateBookRating, deleteBook } = useBooks();

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Want to Read': return <Clock size={16} className="mr-1" />;
      case 'Reading': return <BookOpen size={16} className="mr-1" />;
      case 'Finished': return <CheckCircle2 size={16} className="mr-1" />;
      default: return null;
    }
  };

  const statusClasses = {
    'Want to Read': 'badge-want-to-read',
    'Reading': 'badge-reading',
    'Finished': 'badge-finished'
  };

  return (
    <div 
      className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-64 overflow-hidden bg-slate-200">
        {book.coverUrl ? (
          <img 
            src={book.coverUrl} 
            alt={book.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-700">
            <BookOpen size={64} opacity={0.5} />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={cn("badge flex items-center backdrop-blur-md bg-white/90 shadow-sm", statusClasses[book.status])}>
            {getStatusIcon(book.status)}
            {book.status}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="font-heading font-bold text-lg text-slate-900 line-clamp-2 mb-1">{book.title}</h3>
        <p className="text-slate-500 font-medium mb-4">{book.author}</p>
        
        <div className="mt-auto">
          {book.status === 'Finished' && (
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onClick={() => updateBookRating(book.id, star)}
                  className="focus:outline-none transition-transform hover:scale-125"
                >
                  <Star 
                    size={20} 
                    className={cn(
                      "transition-colors duration-300", 
                      star <= (book.rating || 0) ? "fill-amber-400 text-amber-400" : "text-slate-300"
                    )} 
                  />
                </button>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-4 mt-2">
            <select
              value={book.status}
              onChange={(e) => updateBookStatus(book.id, e.target.value)}
              className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-books-500 focus:border-books-500 outline-none transition-all flex-grow"
            >
              <option value="Want to Read">Want to Read</option>
              <option value="Reading">Reading</option>
              <option value="Finished">Finished</option>
            </select>
            
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this book?')) {
                  deleteBook(book.id);
                }
              }}
              className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-50"
              title="Delete Book"
            >
              <TrashIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
