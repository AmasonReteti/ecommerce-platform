import React, { useState, useEffect, useRef } from 'react';

export default function CategoryCarousel({ products }) {
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStartX = useRef(null);

  const activeProducts = products.filter((p) => p.category === categories[activeIndex]);

  useEffect(() => {
    setSlideIndex(0);
  }, [activeIndex]);

  useEffect(() => {
    if (activeProducts.length === 0) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % activeProducts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeProducts.length, activeIndex]);

  if (categories.length === 0) return null;

  const goTo = (offset) => {
    setActiveIndex((prev) => (prev + offset + categories.length) % categories.length);
  };

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
      <div
        onClick={() => goTo(-1)}
        style={{ flex: '0 0 22%', opacity: 0.5, transform: 'scale(0.9)', cursor: 'pointer', textAlign: 'center' }}
      >
        <div style={{ border: '2px solid var(--color-ink)', borderRadius: '8px', padding: '10px 4px', background: '#f5f5f5' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 'bold', margin: 0 }}>{prevCat}</p>
        </div>
      </div>

      <div style={{ flex: '1 1 56%', border: '3px solid var(--color-ink)', borderRadius: '10px', padding: '12px', background: '#fff', boxShadow: '3px 3px 0px var(--color-ink)' }}>
        <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.85rem', margin: '0 0 8px 0', color: 'var(--color-marigold)' }}>
          {categories[activeIndex]}
        </p>
        {currentProduct && (
          <div style={{ textAlign: 'center' }}>
            {currentProduct.image_url && (
              <img
                src={currentProduct.image_url}
                alt={currentProduct.name}
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', border: '2px solid var(--color-ink)' }}
              />
            )}
            <p style={{ fontSize: '0.8rem', fontWeight: 'bold', margin: '6px 0 2px 0' }}>{currentProduct.name}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-green)', fontWeight: 'bold', margin: 0 }}>KSh {currentProduct.price}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '8px' }}>
              {activeProducts.map((_, i) => (
                <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === slideIndex ? 'var(--color-marigold)' : '#ccc' }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        onClick={() => goTo(1)}
        style={{ flex: '0 0 22%', opacity: 0.5, transform: 'scale(0.9)', cursor: 'pointer', textAlign: 'center' }}
      >
        <div style={{ border: '2px solid var(--color-ink)', borderRadius: '8px', padding: '10px 4px', background: '#f5f5f5' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 'bold', margin: 0 }}>{nextCat}</p>
        </div>
      </div>
    </div>
  );
}
