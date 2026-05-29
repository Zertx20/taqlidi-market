import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../../../contexts/AdminContext';
import { Navbar } from '../../../components/feature/Navbar';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-50 to-amber-50" dir="rtl">
      <Navbar />
      <div className="pt-32 pb-12 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-[#0F766E] font-arabic-elegant mb-2">تقليدي</div>
            <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#0F766E] focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="أدخل كلمة المرور"
                dir="ltr"
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#0F766E] to-teal-600 text-white font-semibold rounded-lg hover:from-[#0D5F58] hover:to-teal-700 transition-all duration-300"
            >
              دخول
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
