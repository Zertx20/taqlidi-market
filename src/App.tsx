import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { CartProvider } from './contexts/CartContext';
import { useLanguageDirection } from './hooks/useLanguageDirection';
import './i18n';

function App() {
  useLanguageDirection();

  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;