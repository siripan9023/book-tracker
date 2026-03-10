import { BookOpen, BookMarked, CheckCircle2, Clock } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { cn } from '../utils/cn';

export default function StatsCard() {
  const { books } = useBooks();

  const totalBooks = books.length;
  const wantToRead = books.filter(b => b.status === 'Want to Read').length;
  const reading = books.filter(b => b.status === 'Reading').length;
  const finished = books.filter(b => b.status === 'Finished').length;

  const statItems = [
    { label: 'Total Books', value: totalBooks, icon: BookMarked, color: 'text-books-500', bg: 'bg-books-50' },
    { label: 'Finished', value: finished, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Reading', value: reading, icon: BookOpen, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Want to Read', value: wantToRead, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div 
            key={stat.label} 
            className="glass-card rounded-2xl p-5 flex items-center gap-4 animate-fade-in-up hover:-translate-y-1 transition-transform duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold font-heading text-slate-800">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
