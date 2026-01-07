import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguageDirection = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = i18n.language;
    
    // Update HTML dir attribute
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    
    // Update body class for font styling
    if (i18n.language === 'ar') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-arabic');
    }
  }, [i18n.language]);
};
