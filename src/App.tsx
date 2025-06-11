import { Routes, Route } from 'react-router-dom';
import LoginForm from '@/components/loginPage/LoginForm';
import SearchPage from '@/pages/search/page.tsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
