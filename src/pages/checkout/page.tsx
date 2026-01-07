import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/feature/Navbar';
import { Footer } from '../../components/feature/Footer';
import { AnimatedBackground } from '../../components/feature/AnimatedBackground';
import { useCart } from '../../contexts/CartContext';
import { wilayas } from '../../mocks/wilayas';

export default function CheckoutPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    wilaya: ''
  });

  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'transfer'>('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber] = useState(Math.floor(100000 + Math.random() * 900000));

  const shippingCost = deliveryOption === 'standard' ? 800 : 1500;
  const total = getCartTotal() + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        <AnimatedBackground />
        <Navbar />
        <div className="pt-20 sm:pt-32 pb-12 sm:pb-24 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-12 shadow-xl"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <i className="ri-check-line text-3xl sm:text-4xl text-green-600"></i>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">{t('checkout.orderSuccess')}</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 text-center">{t('checkout.thankYou')}</p>
              <div className="bg-[#F5F1EB] rounded-lg p-4 mb-6 sm:mb-8">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 text-center">{t('checkout.orderNumber')}</p>
                <p className="text-xl sm:text-2xl font-bold text-[#0F766E] text-center">#{orderNumber}</p>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 text-center">Redirecting to homepage...</p>
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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-8">{t('checkout.title')}</h1>

            <div className="flex items-center justify-center mb-6 sm:mb-12 overflow-x-auto">
              <div className="flex items-center gap-2 sm:gap-4 min-w-max px-4">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#D4AF37] text-white flex items-center justify-center font-bold text-sm sm:text-base">
                    1
                  </div>
                  <span className="font-semibold text-gray-800 text-xs sm:text-base whitespace-nowrap">{t('checkout.shipping')}</span>
                </div>
                <div className="w-8 sm:w-16 h-0.5 bg-gray-300"></div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                    2
                  </div>
                  <span className="text-gray-400 text-xs sm:text-base whitespace-nowrap">{t('checkout.payment')}</span>
                </div>
                <div className="w-8 sm:w-16 h-0.5 bg-gray-300"></div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                    3
                  </div>
                  <span className="text-gray-400 text-xs sm:text-base whitespace-nowrap">{t('checkout.confirmation')}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{t('checkout.shipping')}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    {t('checkout.firstName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    {t('checkout.lastName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    {t('checkout.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    {t('checkout.phone')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mb-3 sm:mb-4">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  {t('checkout.address')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                />
              </div>

              <div className="mb-6 sm:mb-8">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  {t('checkout.wilaya')}
                </label>
                <select
                  required
                  value={formData.wilaya}
                  onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all cursor-pointer"
                >
                  <option value="">{t('checkout.selectWilaya')}</option>
                  {wilayas.map(wilaya => (
                    <option key={wilaya.id} value={wilaya.id}>
                      {i18n.language === 'ar' ? wilaya.nameAr : wilaya.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">{t('checkout.deliveryOptions')}</h3>
              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <label className={`flex items-center justify-between p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  deliveryOption === 'standard' ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-300'
                }`}>
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={deliveryOption === 'standard'}
                      onChange={() => setDeliveryOption('standard')}
                      className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">{t('checkout.standard')}</p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{t('checkout.standardTime')}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#0F766E] text-sm sm:text-base whitespace-nowrap ml-2">800 {t('products.dzd')}</span>
                </label>

                <label className={`flex items-center justify-between p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  deliveryOption === 'express' ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-300'
                }`}>
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={deliveryOption === 'express'}
                      onChange={() => setDeliveryOption('express')}
                      className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">{t('checkout.express')}</p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{t('checkout.expressTime')}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#0F766E] text-sm sm:text-base whitespace-nowrap ml-2">1,500 {t('products.dzd')}</span>
                </label>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">{t('checkout.paymentMethod')}</h3>
              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <label className={`flex items-center p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 cursor-pointer flex-shrink-0"
                  />
                  <i className="ri-money-dollar-circle-line text-xl sm:text-2xl mr-2 sm:mr-3 text-[#0F766E]"></i>
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">{t('checkout.cashOnDelivery')}</span>
                </label>

                <label className={`flex items-center p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  paymentMethod === 'transfer' ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={() => setPaymentMethod('transfer')}
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 cursor-pointer flex-shrink-0"
                  />
                  <i className="ri-bank-line text-xl sm:text-2xl mr-2 sm:mr-3 text-[#0F766E]"></i>
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">{t('checkout.bankTransfer')}</span>
                </label>
              </div>

              <div className="bg-[#F5F1EB] rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex justify-between mb-2 sm:mb-3">
                  <span className="text-gray-600 text-sm sm:text-base">{t('cart.subtotal')}</span>
                  <span className="font-semibold text-sm sm:text-base">{getCartTotal().toLocaleString()} {t('products.dzd')}</span>
                </div>
                <div className="flex justify-between mb-2 sm:mb-3">
                  <span className="text-gray-600 text-sm sm:text-base">{t('cart.shipping')}</span>
                  <span className="font-semibold text-sm sm:text-base">{shippingCost.toLocaleString()} {t('products.dzd')}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 sm:pt-3 flex justify-between">
                  <span className="text-lg sm:text-xl font-bold text-gray-800">{t('cart.total')}</span>
                  <span className="text-lg sm:text-xl font-bold text-[#0F766E]">{total.toLocaleString()} {t('products.dzd')}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="flex-1 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold text-sm sm:text-base rounded-full hover:bg-gray-50 transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  {t('checkout.backToCart')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 sm:py-4 bg-[#D4AF37] text-white font-bold text-sm sm:text-base rounded-full hover:bg-[#B8941F] transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  {t('checkout.placeOrder')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Order Confirmation */}
      {orderPlaced && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8"
        >
          <div className="text-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i className="ri-check-line text-2xl sm:text-4xl text-green-600"></i>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              {t('checkout.orderSuccess')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">{t('checkout.thankYou')}</p>
          </div>

          <div className="bg-amber-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">{t('checkout.orderNumber')}</span>
              <span className="text-sm sm:text-lg font-bold text-teal-700">#{orderNumber}</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">{t('checkout.orderDetails')}</h3>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">{item.name} x {item.quantity}</span>
                    <span className="font-medium">{(item.price * item.quantity).toLocaleString()} {t('products.dzd')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-3">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">{t('checkout.shippingAddress')}</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {formData.firstName} {formData.lastName}<br />
                {formData.address}<br />
                {formData.wilaya}<br />
                {formData.phone}
              </p>
            </div>

            <div className="border-t pt-3">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">{t('checkout.deliveryMethod')}</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {deliveryOption === 'standard' ? t('checkout.standard') : t('checkout.express')}
                {' - '}
                {deliveryOption === 'standard' ? t('checkout.standardTime') : t('checkout.expressTime')}
              </p>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between text-xs sm:text-sm mb-1">
                <span className="text-gray-600">{t('cart.subtotal')}</span>
                <span>{getCartTotal().toLocaleString()} {t('products.dzd')}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm mb-1">
                <span className="text-gray-600">{t('cart.shipping')}</span>
                <span>{shippingCost.toLocaleString()} {t('products.dzd')}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-lg font-bold text-teal-700 pt-2 border-t">
                <span>{t('cart.total')}</span>
                <span>{total.toLocaleString()} {t('products.dzd')}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-teal-700 text-white py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-teal-800 transition-colors whitespace-nowrap"
          >
            {t('checkout.continueShopping')}
          </button>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}