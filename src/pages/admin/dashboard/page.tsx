import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../../../contexts/AdminContext';
import { Navbar } from '../../../components/feature/Navbar';

export default function AdminDashboardPage() {
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-50 to-amber-50" dir="rtl">
      <Navbar />
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">لوحة التحكم</h1>
              <p className="text-gray-600 mt-1">إدارة متجر تقليدي</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              خروج
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'products'
                  ? 'bg-gradient-to-r from-[#0F766E] to-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              المنتجات
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-[#0F766E] to-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              الطلبات
            </button>
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            {activeTab === 'products' ? (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <h2 className="text-xl font-bold text-gray-800">إدارة المنتجات</h2>
                  <button
                    onClick={() => navigate('/admin/products/add')}
                    className="px-4 py-2 bg-gradient-to-r from-[#0F766E] to-teal-600 text-white rounded-lg hover:from-[#0D5F58] hover:to-teal-700 transition-colors"
                  >
                    إضافة منتج
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-[#0F766E]">8</div>
                    <div className="text-gray-600 text-sm">إجمالي المنتجات</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-[#D4AF37]">3</div>
                    <div className="text-gray-600 text-sm">منتجات جديدة</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-emerald-600">5</div>
                    <div className="text-gray-600 text-sm">منتجات رجالية</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/admin/products')}
                  className="mt-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  عرض جميع المنتجات
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">إدارة الطلبات</h2>
                  <button
                    onClick={() => navigate('/admin/orders')}
                    className="px-4 py-2 bg-gradient-to-r from-[#0F766E] to-teal-600 text-white rounded-lg hover:from-[#0D5F58] hover:to-teal-700 transition-colors"
                  >
                    عرض جميع الطلبات
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-yellow-600">2</div>
                    <div className="text-gray-600 text-sm">طلبات قيد الانتظار</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-blue-600">1</div>
                    <div className="text-gray-600 text-sm">طلبات مؤكدة</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-green-600">0</div>
                    <div className="text-gray-600 text-sm">طلبات تم التوصيل</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
