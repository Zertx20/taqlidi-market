import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer className="bg-[#0F766E] text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-[1400px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`text-3xl font-bold text-white ${isRTL ? 'font-arabic-elegant' : ''}`}>
                تقليدي
              </div>
            </div>
            <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xs">
              {t('footer.mission')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-facebook-line text-xl"></i>
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-whatsapp-line text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5 uppercase">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/70 hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-white/70 hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-white/70 hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-white/70 hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
                  {t('footer.sizeGuide')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5">{t('footer.newsletter')}</h3>
            <p className="text-white/70 text-sm mb-4">
              {t('footer.newsletterDesc')}
            </p>
            <div className="flex items-center bg-white rounded-full overflow-hidden">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 px-6 py-3 text-gray-700 outline-none text-sm"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <button className="bg-[#D4AF37] px-6 py-3 hover:bg-[#B8941F] transition-colors duration-300 whitespace-nowrap cursor-pointer">
                <i className={`${isRTL ? 'ri-arrow-left-line' : 'ri-arrow-right-line'} text-white text-lg`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            {t('footer.copyright')}
          </p>
          <a 
            href="https://readdy.ai/?ref=logo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 text-sm hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer"
          >
            {t('footer.poweredBy')} Readdy
          </a>
        </div>
      </div>
    </footer>
  );
};