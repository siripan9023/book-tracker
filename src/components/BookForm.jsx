import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import { v4 as uuidv4 } from 'uuid';
import { Book, User, FileText, CheckCircle } from 'lucide-react'; 

// Import specific generic icon for Image url
import { Image as ImageIcon } from 'lucide-react';

export default function BookForm() {
  const { addBook } = useBooks();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'Want to Read',
    coverUrl: '',
    pages: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate slight network delay for effect
    setTimeout(() => {
      addBook({
        id: uuidv4(),
        title: formData.title,
        author: formData.author,
        status: formData.status,
        coverUrl: formData.coverUrl,
        pages: formData.pages ? parseInt(formData.pages, 10) : null,
        rating: 0,
      });
      setIsSubmitting(false);
      navigate('/');
    }, 400);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 md:p-10 animate-fade-in-up">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Add New Book</h2>
        <p className="text-slate-500">Track a new book in your growing library.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="title">
              Book Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Book className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-books-500 focus:border-books-500 transition-all shadow-sm"
                placeholder="e.g. The Hobbit"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="author">
              Author <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="author"
                name="author"
                type="text"
                required
                value={formData.author}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-books-500 focus:border-books-500 transition-all shadow-sm"
                placeholder="e.g. J.R.R. Tolkien"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="status">
                Current Status
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CheckCircle className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-books-500 focus:border-books-500 transition-all shadow-sm appearance-none"
                >
                  <option value="Want to Read">Want to Read</option>
                  <option value="Reading">Reading</option>
                  <option value="Finished">Finished</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="pages">
                Total Pages (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="pages"
                  name="pages"
                  type="number"
                  min="1"
                  value={formData.pages}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-books-500 focus:border-books-500 transition-all shadow-sm"
                  placeholder="e.g. 310"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="coverUrl">
              Cover Image URL (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ImageIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="coverUrl"
                name="coverUrl"
                type="url"
                value={formData.coverUrl}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-books-500 focus:border-books-500 transition-all shadow-sm"
                placeholder="https://example.com/cover.jpg"
              />
            </div>
            {formData.coverUrl && (
              <div className="mt-3 relative h-32 w-24 rounded-lg overflow-hidden shadow-md border border-slate-200">
                <img src={formData.coverUrl} alt="Cover Preview" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary min-w-[120px]"
          >
            {isSubmitting ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
}
