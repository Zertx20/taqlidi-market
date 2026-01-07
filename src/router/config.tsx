import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const ProductsPage = lazy(() => import('../pages/products/page'));
const CartPage = lazy(() => import('../pages/cart/page'));
const CheckoutPage = lazy(() => import('../pages/checkout/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/products',
    element: <ProductsPage />
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path: '/checkout',
    element: <CheckoutPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;