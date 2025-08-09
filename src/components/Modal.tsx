import Image from 'next/image';
import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCarousel?: boolean;
}

export default function Modal({ isOpen, onClose, showCarousel = true }: ModalProps) {
  const originalSlides = [
    { id: 1, image: "/1.svg" },
    { id: 2, image: "/2.svg" },
    { id: 3, image: "/1.svg" },
    { id: 4, image: "/2.svg" },
    { id: 5, image: "/1.svg" },
    { id: 6, image: "/2.svg" },
    { id: 7, image: "/1.svg" },
    { id: 8, image: "/2.svg" },
    { id: 9, image: "/1.svg" },
    { id: 10, image: "/2.svg" },
  ];

  const [currentSlide, setCurrentSlide] = useState(originalSlides.length + 5); // Начинаем с середины всего массива
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Создаем бесконечный массив с дублированием для плавного перехода
  const slides = [
    ...originalSlides, // Полная копия в начале
    ...originalSlides, // Оригинальные слайды
    ...originalSlides, // Полная копия в конце
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
  };

  // Обработка бесконечности
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      
      // Если дошли до последней трети (конец массива)
      if (currentSlide >= originalSlides.length * 2) {
        setCurrentSlide(originalSlides.length); // Перепрыгиваем к середине
      }
      // Если дошли до первой трети (начало массива)  
      else if (currentSlide < originalSlides.length) {
        setCurrentSlide(originalSlides.length); // Перепрыгиваем к середине
      }
    }, isTransitioning ? 500 : 0);

    return () => clearTimeout(timer);
  }, [currentSlide, originalSlides.length, isTransitioning]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex justify-center pt-8">
        <Image src="/titlewhite.svg" alt="Next.js" width={250} height={250} />
      </div>
      
            <div className="flex-1 flex items-center justify-center relative">
        {showCarousel ? (
          <>
            {/* Left click area */}
            <div 
              className="absolute left-0 top-0 w-1/2 h-full z-10 cursor-pointer"
              onClick={prevSlide}
            ></div>
            
            {/* Right click area */}
            <div 
              className="absolute right-0 top-0 w-1/2 h-full z-10 cursor-pointer"
              onClick={nextSlide}
            ></div>

            {/* Carousel */}
            <div className="relative w-full h-96 overflow-hidden">
              <div 
                className={`flex h-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{
                  transform: `translateX(-${currentSlide * 400}px)`
                }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={`${slide.id}-${index}`}
                    className="flex-shrink-0 w-96 h-full mx-2"
                    style={{
                      zIndex: index === currentSlide ? 10 : 1
                    }}
                  >
                    <Image 
                      src={slide.image} 
                      alt={`Slide ${slide.id}`} 
                      width={360} 
                      height={360}
                      className="w-full h-full object-cover shadow-xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-[80px] justify-center text-white text-center max-w-md">
            <p className="text-[14px] mb-4 uppercase">
            Света мухина
            </p>
            <p className="text-[14px] mb-4 uppercase">
            Даша леднева            </p>
          </div>
        )}
        </div>

     
      
      <div className="flex justify-center pb-8">
        <button onClick={onClose} className="bg-white text-black px-4 py-2 rounded-full">
          Закрыть х
        </button>
      </div>
    </div>
  );
}