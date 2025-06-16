import { Routes, Route } from 'react-router-dom';
import LoginForm from '@/pages/login/LoginForm';
import SearchPage from '@/pages/search/page.tsx';
import CreateBookForm from '@/components/create/CreateBookForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/create" element={<CreateBookForm />} />
    </Routes>
  );
}

export default App;
