import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../../../components/feature/Navbar';

export default function AdminAddProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    price: '',
    category: 'men' as 'men' | 'women',
    image: '',
    imageFile: null as File | null,
    sizes: '',
    colors: '',
    isNew: false
  });
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the product to your backend
    console.log('New product:', formData);
    alert('تم إضافة المنتج بنجاح');
    navigate('/admin/products');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-50 to-amber-50" dir="rtl">
      <Navbar />
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">إضافة منتج جديد</h1>
            <button
              onClick={() => navigate('/admin/products')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              عودة
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">صورة المنتج</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0F766E] transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setFormData({ ...formData, image: '', imageFile: null });
                        }}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        إزالة الصورة
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer"
                      >
                        <i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-2"></i>
                        <p className="text-gray-600">اضغط لرفع صورة أو اسحبها هنا</p>
                        <p className="text-gray-400 text-sm mt-1">PNG, JPG حتى 5MB</p>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم المنتج (عربي)</label>
                  <input
                    type="text"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#0F766E] focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم المنتج (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#0F766E] focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف (عربي)</label>
                <textarea
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#0F766E] focus:ring-2 focus:ring-teal-200 outline-none transition-all h-24"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف (إنجليزي)</label>
                <textarea
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#0F766E] focus:ring-2 focus:ring-teal-200 outline-none transition-all h-24"
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السعر (دج)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#0F766E] focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'men' | 'women' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#0F766E] focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                  >
                    <option value="men">رجال</option>
                    <option value="women">نساء</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المقاسات (مفصولة بفاصلة)</label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#0F766E] focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="S,M,L,XL"
                    dir="ltr"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الألوان (مفصولة بفاصلة)</label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#0F766E] focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="Gold,Burgundy,Black"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isNew"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="w-4 h-4 text-[#0F766E] rounded"
                />
                <label htmlFor="isNew" className="text-sm font-medium text-gray-700">منتج جديد</label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#0F766E] to-teal-600 text-white font-semibold rounded-lg hover:from-[#0D5F58] hover:to-teal-700 transition-all duration-300"
              >
                إضافة المنتج
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
