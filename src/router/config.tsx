import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const AdminLoginPage = lazy(() => import('../pages/admin/login/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin/dashboard/page'));
const AdminProductsPage = lazy(() => import('../pages/admin/products/page'));
const AdminAddProductPage = lazy(() => import('../pages/admin/products/add/page'));
const AdminOrdersPage = lazy(() => import('../pages/admin/orders/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/admin',
    element: <AdminLoginPage />
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboardPage />
  },
  {
    path: '/admin/products',
    element: <AdminProductsPage />
  },
  {
    path: '/admin/products/add',
    element: <AdminAddProductPage />
  },
  {
    path: '/admin/orders',
    element: <AdminOrdersPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;