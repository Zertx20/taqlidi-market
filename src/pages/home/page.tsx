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
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'men' | 'women'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const isRTL = i18n.language === 'ar';

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    return product.category === filter;
  });

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative h-[70vh] sm:h-[85vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Elegant%20flat%20lay%20display%20of%20traditional%20Algerian%20Taqlidi%20clothing%20garments%20featuring%20luxurious%20embroidered%20kaftan%20and%20burnous%20laid%20out%20beautifully%20on%20soft%20fabric%20surface%20with%20intricate%20golden%20embroidery%20patterns%20delicate%20traditional%20motifs%20in%20warm%20cream%20beige%20champagne%20gold%20and%20deep%20emerald%20green%20colors%20showcasing%20refined%20North%20African%20craftsmanship%20on%20flowing%20silk%20and%20wool%20textiles%20with%20gentle%20natural%20lighting%20ethereal%20minimalist%20composition%20highlighting%20cultural%20heritage%20no%20people%20no%20faces%20only%20clothing%20items&width=1920&height=1080&seq=hero-taqlidi-garments-only-v2&orientation=landscape')`
          }}
        />
        
        {/* Animated Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"
        >
          {/* Animated shimmer effect */}
          <motion.div
            animate={{
              background: [
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
          />
        </motion.div>

        <div className="relative z-10 text-center text-white px-4 sm:px-8 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 leading-tight text-white drop-shadow-2xl"
            style={{
              textShadow: '0 4px 6px rgba(0, 0, 0, 0.3), 0 8px 12px rgba(0, 0, 0, 0.2)'
            }}
          >
            {t('home.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-white/95 max-w-4xl mx-auto leading-relaxed"
          >
            {t('home.hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
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
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-amber-300/30 via-orange-300/40 to-yellow-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-teal-300/30 via-emerald-300/40 to-cyan-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 100, -80, 0],
              y: [0, -60, 80, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6
            }}
            className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-300/25 via-pink-300/35 to-rose-300/25 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              x: [0, -120, 90, 0],
              y: [0, 90, -70, 0],
              scale: [1, 0.7, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 9
            }}
            className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-300/25 via-indigo-300/35 to-purple-300/25 rounded-full blur-2xl"
          />
          
          {/* Animated Gradient Overlay */}
          <motion.div
            animate={{
              background: [
                "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(34, 197, 94, 0.1) 50%, rgba(59, 130, 246, 0.2) 100%)",
                "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(251, 191, 36, 0.2) 100%)",
                "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(251, 191, 36, 0.1) 50%, rgba(34, 197, 94, 0.2) 100%)",
                "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(34, 197, 94, 0.1) 50%, rgba(59, 130, 246, 0.2) 100%)"
              ]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
          />
          
          {/* Floating Particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3
              }}
              className="absolute w-3 h-3 bg-gradient-to-br from-amber-400/50 to-orange-400/50 rounded-full blur-sm"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
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
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <i className="ri-close-line text-xl text-gray-700"></i>
              </motion.button>
              
              {/* Product Image */}
              <div className="relative h-64 sm:h-96 overflow-hidden rounded-t-3xl">
                <motion.img
                  src={selectedProduct.image}
                  alt={isRTL ? selectedProduct.nameAr : selectedProduct.name}
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
                    className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                  >
                    {t('products.new')}
                  </motion.div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="p-6 sm:p-8">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
                >
                  {isRTL ? selectedProduct.nameAr : selectedProduct.name}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 mb-6 leading-relaxed"
                >
                  {isRTL ? selectedProduct.descriptionAr : selectedProduct.description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between mb-6"
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
                    {selectedProduct.price.toLocaleString()} {t('products.dzd')}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-[#0F766E] to-teal-600 text-white font-semibold rounded-full hover:from-[#0D5F58] hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {t('products.addToCart')}
                  </motion.button>
                </motion.div>
                
                {/* Product Options */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('products.selectSize')}</label>
                    <div className="flex gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('products.selectColor')}</label>
                    <div className="flex gap-2">
                      {selectedProduct.colors.map((color) => (
                        <button
                          key={color}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors text-sm"
                        >
                          {t(`colors.${color}`)}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
