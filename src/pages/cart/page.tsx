import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/feature/Navbar';
import { Footer } from '../../components/feature/Footer';
import { AnimatedBackground } from '../../components/feature/AnimatedBackground';
import { useCart } from '../../contexts/CartContext';

export default function CartPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const isRTL = i18n.language === 'ar';

  const shippingCost = getCartTotal() > 50000 ? 0 : 800;
  const total = getCartTotal() + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        <AnimatedBackground />
        <Navbar />
        <div className="pt-20 sm:pt-32 pb-12 sm:pb-24 px-4">
          <div className="max-w-[1400px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <i className="ri-shopping-cart-line text-6xl sm:text-8xl text-gray-300 mb-4 sm:mb-6"></i>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">{t('cart.empty')}</h2>
              <Link
                to="/products"
                className="inline-block mt-4 sm:mt-6 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-[#D4AF37] text-white font-semibold rounded-full hover:bg-[#B8941F] transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                {t('cart.continueShopping')}
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <AnimatedBackground />
      <Navbar />

      <div className="pt-20 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">{t('cart.title')}</h1>
                <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-8">
                  ({cart.length} {t('cart.items')})
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {cart.map((item, index) => {
                    const itemName = i18n.language === 'ar' ? item.nameAr : item.nameEn;
                    return (
                      <motion.div
                        key={`${item.id}-${item.size}-${item.color}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg p-3 sm:p-6 flex gap-3 sm:gap-6"
                      >
                        <div className="w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={itemName}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 truncate">{itemName}</h3>
                          <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">
                            {t('cart.size')}: {item.size}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                            {t('cart.color')}: {item.color}
                          </p>
                          <p className="text-base sm:text-xl font-bold text-[#0F766E]">
                            {item.price.toLocaleString()} {t('products.dzd')}
                          </p>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <div className="flex items-center gap-1 sm:gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <i className="ri-subtract-line text-sm sm:text-base"></i>
                            </button>
                            <span className="w-8 sm:w-10 text-center font-semibold text-sm sm:text-base">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <i className="ri-add-line text-sm sm:text-base"></i>
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                            className="text-red-500 text-xs sm:text-sm hover:text-red-700 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <i className="ri-delete-bin-line mr-1"></i>
                            {t('cart.remove')}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-4 sm:p-8 shadow-lg lg:sticky lg:top-32"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{t('cart.orderSummary')}</h2>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                    <span>{t('cart.subtotal')}</span>
                    <span className="font-semibold">{getCartTotal().toLocaleString()} {t('products.dzd')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                    <span>{t('cart.shipping')}</span>
                    <span className="font-semibold">
                      {shippingCost === 0 ? t('cart.free') : `${shippingCost.toLocaleString()} ${t('products.dzd')}`}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 sm:pt-4">
                    <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-800">
                      <span>{t('cart.total')}</span>
                      <span className="text-[#0F766E]">{total.toLocaleString()} {t('products.dzd')}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3 sm:py-4 text-sm sm:text-base bg-[#D4AF37] text-white font-bold rounded-full hover:bg-[#B8941F] transition-all duration-300 mb-3 sm:mb-4 whitespace-nowrap cursor-pointer"
                >
                  {t('cart.checkout')}
                </button>

                <div className="flex items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm">
                  <i className="ri-lock-line"></i>
                  <span>{t('cart.secureCheckout')}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}