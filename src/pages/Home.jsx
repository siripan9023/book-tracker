import StatsCard from '../components/StatsCard';
import BookList from '../components/BookList';
import { useBooks } from '../context/BookContext';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const { books } = useBooks();

  // Sort by newest, take top 4
  const recentBooks = [...books]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-4">
        <div>
          <h1 className="text-4xl font-heading font-extrabold text-slate-900 flex items-center gap-3">
            Welcome Back <Sparkles className="text-amber-400" size={32} />
          </h1>
          <p className="text-lg text-slate-500 mt-2 max-w-2xl">
            Here's an overview of your reading journey. Track your progress, manage your collection, and discover more.
          </p>
        </div>
      </div>

      <StatsCard />

      <div className="pt-4 border-t border-slate-200/50">
        <BookList 
          books={recentBooks} 
          title="Recently Added" 
          emptyMessage="You haven't added any books yet. Start building your library!" 
        />
      </div>
    </div>
  );
}
