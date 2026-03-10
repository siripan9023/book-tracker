import { Search, Filter } from 'lucide-react';

export default function FilterBar({ searchQuery, setSearchQuery, filterStatus, setFilterStatus }) {
  return (
    <div className="glass-card rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-books-500 focus:border-books-500 sm:text-sm transition-all shadow-sm"
          placeholder="Search books by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="relative sm:w-48 shrink-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Filter className="h-4 w-4 text-slate-400" />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-books-500 focus:border-books-500 sm:text-sm transition-all shadow-sm appearance-none"
        >
          <option value="All">All Statuses</option>
          <option value="Want to Read">Want to Read</option>
          <option value="Reading">Reading</option>
          <option value="Finished">Finished</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
        </div>
      </div>
    </div>
  );
}
