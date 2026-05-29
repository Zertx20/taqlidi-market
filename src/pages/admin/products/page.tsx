import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../../components/feature/Navbar';
import { products } from '../../../mocks/products';

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState(products);

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProductList(productList.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-50 to-amber-50" dir="rtl">
      <Navbar />
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">إدارة المنتجات</h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              عودة
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#0F766E] to-teal-600">
                  <tr>
                    <th className="px-4 py-4 text-right text-sm font-semibold text-white">الصورة</th>
                    <th className="px-4 py-4 text-right text-sm font-semibold text-white">الاسم</th>
                    <th className="px-4 py-4 text-right text-sm font-semibold text-white">السعر</th>
                    <th className="px-4 py-4 text-right text-sm font-semibold text-white">الفئة</th>
                    <th className="px-4 py-4 text-right text-sm font-semibold text-white">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((product) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-4">
                        <img
                          src={product.image}
                          alt={product.nameAr}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-800">{product.nameAr}</td>
                      <td className="px-4 py-4 text-gray-600">{product.price.toLocaleString()} دج</td>
                      <td className="px-4 py-4 text-gray-600">{product.category === 'men' ? 'رجال' : 'نساء'}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {productList.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                لا توجد منتجات حالياً
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
