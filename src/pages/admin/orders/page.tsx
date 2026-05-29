import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../../components/feature/Navbar';

interface Order {
  id: string;
  productName: string;
  customerName: string;
  phone: string;
  wilaya: string;
  deliveryType: 'home' | 'bureau';
  size: string;
  color: string;
  price: number;
  date: string;
  status: 'pending' | 'confirmed' | 'delivered';
}

export default function AdminOrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  // Mock orders - in production, this would come from your backend
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 'ORD-001',
        productName: 'قراقو جزائري فاخر',
        customerName: 'أحمد محمد',
        phone: '0555123456',
        wilaya: 'algiers',
        deliveryType: 'home',
        size: 'L',
        color: 'Gold',
        price: 45000,
        date: '2025-05-29',
        status: 'pending'
      },
      {
        id: 'ORD-002',
        productName: 'برنوس صوفي تقليدي',
        customerName: 'فاطمة علي',
        phone: '0666789012',
        wilaya: 'oran',
        deliveryType: 'bureau',
        size: 'M',
        color: 'Burgundy',
        price: 38000,
        date: '2025-05-28',
        status: 'confirmed'
      }
    ];
    setOrders(mockOrders);
  }, []);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'قيد الانتظار';
      case 'confirmed': return 'مؤكد';
      case 'delivered': return 'تم التوصيل';
    }
  };

  const getWilayaName = (wilaya: string) => {
    const wilayas: Record<string, string> = {
      algiers: 'الجزائر',
      oran: 'وهران',
      constantine: 'قسنطينة',
      annaba: 'عنابة',
      blida: 'البليدة',
      setif: 'سطيف',
      batna: 'باتنة',
      tlemcen: 'تلمسان',
      bejaia: 'بجاية',
      mostaganem: 'مستغانم'
    };
    return wilayas[wilaya] || wilaya;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-50 to-amber-50" dir="rtl">
      <Navbar />
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">إدارة الطلبات</h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              عودة
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto" dir="rtl">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gradient-to-r from-[#0F766E] to-teal-600">
                  <tr>
                    <th className="px-3 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white whitespace-nowrap">رقم الطلب</th>
                    <th className="px-3 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white whitespace-nowrap">المنتج</th>
                    <th className="px-3 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white whitespace-nowrap">العميل</th>
                    <th className="px-3 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white whitespace-nowrap">الهاتف</th>
                    <th className="px-3 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white whitespace-nowrap">الولاية</th>
                    <th className="px-3 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white whitespace-nowrap">التوصيل</th>
                    <th className="px-3 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white whitespace-nowrap">المقاس/اللون</th>
                    <th className="px-3 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white whitespace-nowrap">السعر</th>
                    <th className="px-3 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white whitespace-nowrap">الحالة</th>
                    <th className="px-3 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white whitespace-nowrap">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-3 py-3 sm:py-4 font-medium text-gray-800 text-xs sm:text-sm whitespace-nowrap">{order.id}</td>
                      <td className="px-3 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap">{order.productName}</td>
                      <td className="px-3 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap">{order.customerName}</td>
                      <td className="px-3 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap" dir="ltr">{order.phone}</td>
                      <td className="px-3 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap">{getWilayaName(order.wilaya)}</td>
                      <td className="px-3 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                        {order.deliveryType === 'home' ? 'توصيل للمنزل' : 'استلام من المكتب'}
                      </td>
                      <td className="px-3 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap">{order.size} / {order.color}</td>
                      <td className="px-3 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap">{order.price.toLocaleString()} دج</td>
                      <td className="px-3 py-3 sm:py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="confirmed">مؤكد</option>
                          <option value="delivered">تم التوصيل</option>
                        </select>
                      </td>
                      <td className="px-3 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap">{order.date}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {orders.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                لا توجد طلبات حالياً
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
