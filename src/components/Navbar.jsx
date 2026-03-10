import { Link, useLocation } from 'react-router-dom';
import { BookMarked, Home, Library, PlusCircle } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Library', path: '/library', icon: Library },
    { name: 'Add Book', path: '/add', icon: PlusCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-x-0 border-t-0 py-4 px-6 md:px-8 animate-fade-in-up">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-books-500 p-2 rounded-xl text-white group-hover:scale-110 group-hover:bg-books-600 transition-all duration-300">
            <BookMarked size={24} />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-slate-900 group-hover:text-books-600 transition-colors">
            Book Tracker
          </span>
        </Link>
        
        <ul className="flex items-center gap-1 md:gap-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300",
                    isActive 
                      ? "bg-books-100 text-books-700" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon size={18} className={cn(isActive && "text-books-600")} />
                  <span className="hidden sm:inline">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
