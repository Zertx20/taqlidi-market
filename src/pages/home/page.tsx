import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/feature/Navbar';
import { Footer } from '../../components/feature/Footer';
import { AnimatedBackground } from '../../components/feature/AnimatedBackground';
import ProductCard from './components/ProductCard';
import { products } from '../../mocks/products';

interface Product {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  category: 'men' | 'women';
  image: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
}

export default function HomePage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'men' | 'women'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wilaya: '',
    deliveryType: 'home' as 'home' | 'bureau',
    size: '',
    color: ''
  });

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    return product.category === filter;
  });

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setOrderSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      wilaya: '',
      deliveryType: 'home',
      size: product.sizes[0],
      color: product.colors[0]
    });
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.wilaya) {
      alert(t('products.orderForm.error'));
      return;
    }
    setOrderSubmitted(true);
    // Here you would typically send the order to your backend
    console.log('Order submitted:', {
      product: selectedProduct?.nameAr,
      ...formData
    });
  };

  const suggestedProducts = selectedProduct 
    ? products.filter(p => p.id !== selectedProduct.id).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative h-[70vh] sm:h-[85vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image - optimized img tag for faster loading */}
        <img
          src="https://readdy.ai/api/search-image?query=Elegant%20flat%20lay%20display%20of%20traditional%20Algerian%20Taqlidi%20clothing%20garments%20featuring%20luxurious%20embroidered%20kaftan%20and%20burnous%20laid%20out%20beautifully%20on%20soft%20fabric%20surface%20with%20intricate%20golden%20embroidery%20patterns%20delicate%20traditional%20motifs%20in%20warm%20cream%20beige%20champagne%20gold%20and%20deep%20emerald%20green%20colors%20showcasing%20refined%20North%20African%20craftsmanship%20on%20flowing%20silk%20and%20wool%20textiles%20with%20gentle%20natural%20lighting%20ethereal%20minimalist%20composition%20highlighting%20cultural%20heritage%20no%20people%20no%20faces%20only%20clothing%20items&width=1920&height=1080&seq=hero-taqlidi-garments-only-v2&orientation=landscape"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        {/* Dark Overlay - static, no animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        <div className="relative z-10 text-center text-white px-4 sm:px-8 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 leading-tight text-white drop-shadow-2xl"
            style={{
              textShadow: '0 4px 6px rgba(0, 0, 0, 0.3), 0 8px 12px rgba(0, 0, 0, 0.2)'
            }}
          >
            {t('home.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-white/95 max-w-4xl mx-auto leading-relaxed"
          >
            {t('home.hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/products"
              className="inline-block px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-bold rounded-full hover:from-[#B8941F] hover:to-[#9A7A1A] transition-all duration-300 shadow-2xl hover:shadow-[#D4AF37]/50 hover:shadow-3xl whitespace-nowrap cursor-pointer relative overflow-hidden group"
            >
              <span className="relative z-10">{t('home.hero.cta')}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#F4E4C1] to-[#D4AF37] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-8 relative">
        {/* Section Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent"></div>
        
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-12 gap-4">
              <motion.h2 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-4xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-teal-700 bg-clip-text text-transparent"
              >
                {t('products.featured')}
              </motion.h2>
              
              <div className="flex gap-2 sm:gap-3">
                {['all', 'men', 'women'].map((filterType, index) => (
                  <motion.button
                    key={filterType}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    onClick={() => setFilter(filterType as 'all' | 'men' | 'women')}
                    className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer relative overflow-hidden group ${
                      filter === filterType
                        ? 'bg-gradient-to-r from-[#0F766E] to-teal-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">
                      {filterType === 'all' ? t('products.all') : 
                       filterType === 'men' ? t('products.men') : t('products.women')}
                    </span>
                    {filter === filterType && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-gradient-to-r from-[#0F766E] to-teal-600"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {filteredProducts.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <ProductCard product={product} index={index} onQuickView={handleQuickView} />
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-center"
            >
              <Link
                to="/products"
                className="inline-block px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-[#0F766E] to-teal-600 text-white font-semibold rounded-full hover:from-[#0D5F58] hover:to-teal-700 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {t('products.viewAll')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50">
          {/* Static decorative blobs - no blur, no animation */}
          <div
            className="absolute top-10 right-10 w-80 h-80 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)' }}
          />

          {/* Static gradient overlay - no animation */}
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(34, 197, 94, 0.05) 50%, rgba(59, 130, 246, 0.1) 100%)' }}
          />
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 bg-gradient-to-r from-gray-800 to-teal-700 bg-clip-text text-transparent"
              >
                {t('home.about.title')}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed"
              >
                {t('home.about.description')}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-lg text-gray-600 leading-relaxed"
              >
                {t('home.about.mission')}
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative h-64 sm:h-96 rounded-2xl overflow-hidden shadow-2xl group"
            >
              <motion.img
                src="https://readdy.ai/api/search-image?query=Beautiful%20artistic%20display%20of%20traditional%20Algerian%20clothing%20craftsmanship%2C%20featuring%20detailed%20embroidery%20work%2C%20intricate%20patterns%2C%20and%20traditional%20textile%20techniques%20in%20warm%20luxury%20colors%20of%20gold%2C%20beige%2C%20and%20deep%20green%2C%20showcasing%20the%20cultural%20heritage%20and%20artisanal%20quality%20of%20Algerian%20traditional%20garments%20with%20elegant%20fabric%20textures%20and%20ornate%20decorative%20elements&width=800&height=600&seq=about-taqlidi-craft-002&orientation=landscape"
                alt="Traditional Craftsmanship"
                className="w-full h-full object-cover object-top"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedProduct && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="bg-white rounded-t-2xl sm:rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <i className="ri-close-line text-lg sm:text-xl text-gray-700"></i>
              </motion.button>
              
              {/* Product Image */}
              <div className="relative h-40 sm:h-48 md:h-64 lg:h-96 overflow-hidden rounded-t-2xl sm:rounded-t-2xl sm:rounded-t-3xl">
                <motion.img
                  src={selectedProduct.image}
                  alt={selectedProduct.nameAr}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Product Badge */}
                {selectedProduct.isNew && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg"
                  >
                    {t('products.new')}
                  </motion.div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4"
                >
                  {selectedProduct.nameAr}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 mb-3 sm:mb-4 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base"
                >
                  {selectedProduct.descriptionAr}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
                    {selectedProduct.price.toLocaleString()} {t('products.dzd')}
                  </div>
                </motion.div>
                
                {/* Order Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2 sm:space-y-3 md:space-y-4"
                >
                  {orderSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 md:p-6 text-center"
                    >
                      <i className="ri-check-circle-line text-2xl sm:text-3xl md:text-4xl text-green-600 mb-1 sm:mb-2 md:mb-3"></i>
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-green-800 mb-2">{t('products.orderForm.success')}</h4>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="mt-2 sm:mt-3 md:mt-4 px-3 sm:px-4 md:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm md:text-base"
                      >
                        إغلاق
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleOrderSubmit} className="space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="overflow-x-auto pb-2">
                        <div className="min-w-[320px] sm:min-w-full space-y-2 sm:space-y-3 md:space-y-4">
                          <div>
                            <label className="block text-xs sm:text-xs md:text-sm font-medium text-gray-700 mb-1 sm:mb-1 md:mb-2">{t('products.orderForm.name')}</label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-3 sm:px-3 md:px-4 py-2 sm:py-2 md:py-2.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-sm sm:text-sm md:text-base"
                              placeholder="أدخل اسمك الكامل"
                              dir="rtl"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs sm:text-xs md:text-sm font-medium text-gray-700 mb-1 sm:mb-1 md:mb-2">{t('products.orderForm.phone')}</label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-3 sm:px-3 md:px-4 py-2 sm:py-2 md:py-2.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-sm sm:text-sm md:text-base"
                              placeholder="05XX XXX XXX"
                              dir="ltr"
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-xs md:text-sm font-medium text-gray-700 mb-1 sm:mb-1 md:mb-2">{t('products.orderForm.wilaya')}</label>
                            <select
                              value={formData.wilaya}
                              onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                              className="w-full px-3 sm:px-3 md:px-4 py-2 sm:py-2 md:py-2.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-sm sm:text-sm md:text-base"
                              dir="rtl"
                            >
                              <option value="">{t('products.orderForm.selectWilaya')}</option>
                              <option value="algiers">الجزائر</option>
                              <option value="oran">وهران</option>
                              <option value="constantine">قسنطينة</option>
                              <option value="annaba">عنابة</option>
                              <option value="blida">البليدة</option>
                              <option value="setif">سطيف</option>
                              <option value="batna">باتنة</option>
                              <option value="tlemcen">تلمسان</option>
                              <option value="bejaia">بجاية</option>
                              <option value="mostaganem">مستغانم</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs sm:text-xs md:text-sm font-medium text-gray-700 mb-1 sm:mb-1 md:mb-2">{t('products.orderForm.deliveryType')}</label>
                            <div className="flex gap-2 sm:gap-2 md:gap-3">
                              <label className="flex-1 cursor-pointer">
                                <input
                                  type="radio"
                                  name="deliveryType"
                                  value="home"
                                  checked={formData.deliveryType === 'home'}
                                  onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value as 'home' | 'bureau' })}
                                  className="hidden"
                                />
                                <div className={`p-2 sm:p-2 md:p-3 border-2 rounded-lg text-center transition-all ${
                                  formData.deliveryType === 'home' 
                                    ? 'border-teal-500 bg-teal-50 text-teal-700' 
                                    : 'border-gray-300 hover:border-teal-300'
                                }`}>
                                  <i className="ri-home-4-line text-base sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-1"></i>
                                  <div className="text-xs sm:text-xs md:text-sm font-medium">{t('products.orderForm.home')}</div>
                                </div>
                              </label>
                              <label className="flex-1 cursor-pointer">
                                <input
                                  type="radio"
                                  name="deliveryType"
                                  value="bureau"
                                  checked={formData.deliveryType === 'bureau'}
                                  onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value as 'home' | 'bureau' })}
                                  className="hidden"
                                />
                                <div className={`p-2 sm:p-2 md:p-3 border-2 rounded-lg text-center transition-all ${
                                  formData.deliveryType === 'bureau' 
                                    ? 'border-teal-500 bg-teal-50 text-teal-700' 
                                    : 'border-gray-300 hover:border-teal-300'
                                }`}>
                                  <i className="ri-building-4-line text-base sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-1"></i>
                                  <div className="text-xs sm:text-xs md:text-sm font-medium">{t('products.orderForm.bureau')}</div>
                                </div>
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs sm:text-xs md:text-sm font-medium text-gray-700 mb-1 sm:mb-1 md:mb-2">{t('products.selectSize')}</label>
                            <div className="flex gap-2 sm:gap-1.5 md:gap-2 flex-wrap">
                              {selectedProduct.sizes.map((size) => (
                                <button
                                  key={size}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, size })}
                                  className={`px-3 sm:px-3 md:px-4 py-1.5 sm:py-1.5 md:py-2 border rounded-lg transition-colors text-xs sm:text-xs md:text-sm ${
                                    formData.size === size
                                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                                      : 'border-gray-300 hover:border-teal-500'
                                  }`}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-xs sm:text-xs md:text-sm font-medium text-gray-700 mb-1 sm:mb-1 md:mb-2">{t('products.selectColor')}</label>
                            <div className="flex gap-2 sm:gap-1.5 md:gap-2 flex-wrap">
                              {selectedProduct.colors.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, color })}
                                  className={`px-3 sm:px-3 md:px-4 py-1.5 sm:py-1.5 md:py-2 border rounded-lg transition-colors text-xs sm:text-xs md:text-sm ${
                                    formData.color === color
                                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                                      : 'border-gray-300 hover:border-teal-500'
                                  }`}
                                >
                                  {t(`colors.${color}`)}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-[#0F766E] to-teal-600 text-white font-semibold rounded-xl hover:from-[#0D5F58] hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl text-xs sm:text-sm md:text-base"
                      >
                        {t('products.orderForm.submit')}
                      </motion.button>
                    </form>
                  )}
                </motion.div>

                {/* Product Suggestions */}
                {!orderSubmitted && suggestedProducts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-3 sm:mt-4 md:mt-6 pt-3 sm:pt-4 md:pt-6 border-t border-gray-200"
                  >
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">منتجات مقترحة</h4>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3">
                      {suggestedProducts.map((product) => (
                        <motion.button
                          key={product.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickView(product)}
                          className="relative rounded-lg overflow-hidden aspect-square"
                        >
                          <img
                            src={product.image}
                            alt={product.nameAr}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity p-0.5 sm:p-1">
                            <span className="text-white text-[8px] sm:text-[10px] md:text-xs font-medium text-center leading-tight">{product.nameAr}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
