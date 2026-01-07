import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { getCartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/products', label: t('nav.collections') }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className={`text-2xl sm:text-3xl font-bold ${scrolled ? 'text-[#0F766E]' : 'text-white'} ${isRTL ? 'font-arabic-elegant' : ''}`}>
              تقليدي
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-semibold transition-all duration-300 relative whitespace-nowrap ${
                  location.pathname === link.path
                    ? scrolled ? 'text-[#0F766E]' : 'text-white'
                    : scrolled ? 'text-gray-700 hover:text-[#0F766E]' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D4AF37]"></span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 transition-all duration-300 whitespace-nowrap text-sm font-semibold ${
                scrolled
                  ? 'border-[#0F766E] text-gray-700 hover:bg-[#0F766E] hover:text-white'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <span className={i18n.language === 'ar' ? 'font-bold' : ''}>ع</span>
              <span className="text-gray-400">|</span>
              <span className={i18n.language === 'en' ? 'font-bold' : ''}>EN</span>
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className={`relative p-1.5 sm:p-2 transition-colors duration-300 ${
                scrolled ? 'text-gray-700 hover:text-[#0F766E]' : 'text-white hover:text-white/80'
              }`}
            >
              <i className="ri-shopping-cart-line text-xl sm:text-2xl"></i>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-1.5 transition-colors duration-300 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden mt-4 pb-4 ${scrolled ? 'bg-white' : 'bg-black/20 backdrop-blur-md'} rounded-lg`}>
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 text-sm font-semibold transition-all duration-300 rounded-lg ${
                    location.pathname === link.path
                      ? scrolled ? 'bg-[#0F766E]/10 text-[#0F766E]' : 'bg-white/20 text-white'
                      : scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`mx-4 mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 text-sm font-semibold ${
                  scrolled
                    ? 'border-[#0F766E] text-gray-700 hover:bg-[#0F766E] hover:text-white'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
              >
                <span className={i18n.language === 'ar' ? 'font-bold' : ''}>ع</span>
                <span className="text-gray-400">|</span>
                <span className={i18n.language === 'en' ? 'font-bold' : ''}>EN</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};