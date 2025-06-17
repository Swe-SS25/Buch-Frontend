import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/login/page';
import SearchPage from '@/pages/search/page';
import CreateBookForm from '@/components/create/CreateBookForm';
import BookDetail from '@/pages/details/page';
import PrivateRoute from '@/components/privateRoute/privateRoute'; // <-- Auth-Schicht
import AdminRoute from './components/privateRoute/adminRoute';

function App() {
  return (
    <Routes>
      {/* Öffentliche Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Geschützte Routen */}
      <Route element={<PrivateRoute />}>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:id/details" element={<BookDetail />} />
      </Route>
      
      <Route element={<AdminRoute />}>
        <Route path="/create" element={<CreateBookForm />} />
      </Route>
    </Routes>
  );
}

export default App;

