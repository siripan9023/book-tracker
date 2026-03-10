import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Library from './pages/Library';
import AddBook from './pages/AddBook';
import { BookProvider } from './context/BookContext';

function App() {
  return (
    <Router>
      <BookProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-books-200 selection:text-books-900">
          <Navbar />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
              <Route path="/add" element={<AddBook />} />
            </Routes>
          </main>
          
          <footer className="mt-auto py-6 border-t border-slate-200 text-center text-slate-500 text-sm">
            <p>Book Tracker &copy; {new Date().getFullYear()} — Built with React & Tailwind CSS.</p>
          </footer>
        </div>
      </BookProvider>
    </Router>
  );
}

export default App;
