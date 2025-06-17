import { Routes, Route } from 'react-router-dom';
import LoginForm from '@/pages/login/LoginForm';
import SearchPage from '@/pages/search/page.tsx';
import CreateBookForm from '@/components/create/CreateBookForm';
import BookDetail from '@/pages/details/page.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/create" element={<CreateBookForm />} />
      <Route path="/:id/details" element={<BookDetail />} />
    </Routes>
  );
}

export default App;
