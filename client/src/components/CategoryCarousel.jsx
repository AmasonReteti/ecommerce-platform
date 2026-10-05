import React, { useState, useEffect, useRef } from 'react';

/*
  Ushirika category carousel.
  Shows one "active" category in the center, with the previous and next
  categories dimmed on either side. Auto-advances through every product
  in the active category, then moves on to the next category automatically,
  looping back to the first category once the last one finishes.
  Swiping left/right lets the user jump categories manually at any time.
*/
export default function CategoryCarousel({ products }) {
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStartX = useRef(null);

  const activeProducts = products.filter((p) => p.category === categories[activeIndex]);

  // Manual navigation (swipe or tapping a side panel) jumps straight to
  // a new category and always starts at its first product.
  const goTo = (offset) => {
    setActiveIndex((prev) => (prev + offset + categories.length) % categories.length);
    setSlideIndex(0);
  };

  // Single timer drives the whole chain: step through this category's
  // products one by one, and once the last one is shown, move on to the
  // next category (wrapping back to the first after the last category).
  useEffect(() => {
    if (categories.length === 0) return;
    const timer = setInterval(() => {
      setSlideIndex((prevSlide) => {
        if (prevSlide + 1 < activeProducts.length) {
          return prevSlide + 1;
        }
        setActiveIndex((prevCat) => (prevCat + 1) % categories.length);
        return 0;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [activeProducts.length, categories.length]);

  if (categories.length === 0) return null;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) goTo(1);
    if (diff < -50) goTo(-1);
    touchStartX.current = null;
  };

  const prevCat = categories[(activeIndex - 1 + categories.length) % categories.length];
  const nextCat = categories[(activeIndex + 1) % categories.length];
  const currentProduct = activeProducts[slideIndex];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '15px 0', padding: '10px 0' }}
    >
      <div onClick={() => goTo(-1)} style={{ flex: '0 0 22%', opacity: 0.5, transform: 'scale(0.9)', cursor: 'pointer', textAlign: 'center' }}>
        <div className="card" style={{ padding: '10px 4px', background: '#F5F5F5' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 'bold', margin: 0 }}>{prevCat}</p>
        </div>
      </div>

      <div className="card" style={{ flex: '1 1 56%', padding: '12px' }}>
        <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.85rem', margin: '0 0 8px 0', color: 'var(--color-terracotta)' }}>
          {categories[activeIndex]}
        </p>
        {currentProduct && (
          <div style={{ textAlign: 'center' }}>
            {currentProduct.image_url && (
              <img
                src={currentProduct.image_url}
                alt={currentProduct.name}
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px' }}
              />
            )}
            <p style={{ fontSize: '0.8rem', fontWeight: 'bold', margin: '6px 0 2px 0' }}>{currentProduct.name}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-forest)', fontWeight: 'bold', margin: 0 }}>KSh {currentProduct.price}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '8px' }}>
              {activeProducts.map((_, i) => (
                <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === slideIndex ? 'var(--color-honey)' : '#ddd' }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div onClick={() => goTo(1)} style={{ flex: '0 0 22%', opacity: 0.5, transform: 'scale(0.9)', cursor: 'pointer', textAlign: 'center' }}>
        <div className="card" style={{ padding: '10px 4px', background: '#F5F5F5' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 'bold', margin: 0 }}>{nextCat}</p>
        </div>
      </div>
    </div>
  );
}
