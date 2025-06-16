import { Routes, Route } from 'react-router-dom';
import LoginForm from '@/components/loginPage/LoginForm';
import SearchPage from '@/pages/search/page.tsx';
import CreateBookForm from '@/components/creat/CreatBookForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/creat" element={<CreateBookForm />} />
    </Routes>
  );
}

export default App;
