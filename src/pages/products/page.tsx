
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/feature/Navbar';
import { Footer } from '../../components/feature/Footer';
import { AnimatedBackground } from '../../components/feature/AnimatedBackground';
import ProductCard from '../home/components/ProductCard';
import { products } from '../../mocks/products';

export default function ProductsPage() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'men' | 'women'>('all');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const isRTL = i18n.language === 'ar';

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleQuickView = (product: typeof products[0]) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <AnimatedBackground />
      <Navbar />

      <div className="pt-20 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-12 gap-4">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">{t('products.title')}</h1>
              
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t('products.all')}
                </button>
                <button
                  onClick={() => setSelectedCategory('men')}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'men'
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t('products.men')}
                </button>
                <button
                  onClick={() => setSelectedCategory('women')}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'women'
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t('products.women')}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} onQuickView={handleQuickView} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {isRTL ? selectedProduct.nameAr : selectedProduct.name}
                </h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
              <img
                src={selectedProduct.image}
                alt={isRTL ? selectedProduct.nameAr : selectedProduct.name}
                className="w-full h-64 sm:h-96 object-cover rounded-lg mb-4"
              />
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                {isRTL ? selectedProduct.descriptionAr : selectedProduct.description}
              </p>
              <div className="text-xl sm:text-2xl font-bold text-teal-700 mb-4">
                {selectedProduct.price.toLocaleString()} {t('products.dzd')}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
