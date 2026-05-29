import { useEffect } from 'react';

export const useLanguageDirection = () => {
  useEffect(() => {
    // Always use Arabic language
    document.documentElement.lang = 'ar';
    
    // Always use RTL direction
    document.documentElement.dir = 'rtl';
    
    // Always use Arabic font
    document.body.classList.add('font-arabic');
    document.body.classList.remove('font-sans');
  }, []);
};
