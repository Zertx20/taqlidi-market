import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { AdminProvider } from './contexts/AdminContext';
import { useLanguageDirection } from './hooks/useLanguageDirection';
import './i18n';

function App() {
  useLanguageDirection();

  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AdminProvider>
        <AppRoutes />
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;