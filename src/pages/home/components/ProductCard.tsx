
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../../contexts/CartContext';

interface Product {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  category: 'men' | 'women';
  description: string;
  descriptionAr: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, index, onQuickView }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const isRTL = i18n.language === 'ar';

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: isRTL ? product.nameAr : product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative h-64 sm:h-80 overflow-hidden bg-gradient-to-br from-amber-50 to-teal-50">
        <img
          src={product.image}
          alt={isRTL ? product.nameAr : product.name}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-teal-700 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
            {t('products.new')}
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <span className="bg-white text-teal-800 px-4 sm:px-6 py-2 rounded-full font-medium text-xs sm:text-sm hover:bg-teal-700 hover:text-white transition-colors whitespace-nowrap">
            {t('products.quickView')}
          </span>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-1">
          {isRTL ? product.nameAr : product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-lg sm:text-xl font-bold text-teal-700">
            {product.price.toLocaleString()} {t('products.dzd')}
          </span>
        </div>

        {/* Size Selection */}
        <div className="mb-2 sm:mb-3">
          <label className="text-xs text-gray-600 mb-1 block">{t('products.selectSize')}</label>
          <div className="flex gap-1 sm:gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 sm:px-3 py-1 text-xs rounded border transition-colors whitespace-nowrap ${
                  selectedSize === size
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-teal-700'
                }`}
              >
                {t(`sizes.${size}`) !== `sizes.${size}` ? t(`sizes.${size}`) : size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-3 sm:mb-4">
          <label className="text-xs text-gray-600 mb-1 block">{t('products.selectColor')}</label>
          <div className="flex gap-1 sm:gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-2 sm:px-3 py-1 text-xs rounded border transition-colors whitespace-nowrap ${
                  selectedColor === color
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-teal-700'
                }`}
              >
                {t(`colors.${color}`) !== `colors.${color}` ? t(`colors.${color}`) : color}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-teal-700 text-white py-2 rounded-lg font-medium text-xs sm:text-sm hover:bg-teal-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <i className="ri-shopping-cart-line"></i>
          {t('products.addToCart')}
        </button>
      </div>
    </motion.div>
  );
}
