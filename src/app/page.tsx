'use client';
import Image from 'next/image';
import Cards from './cards/page';
import Modal from '../components/Modal';
import Polaroids from '../components/Polaroids';
import { useState, useEffect } from 'react';

interface Card {
  id: number;
  image: string;
  text: string;
  date: string;
  rotation: string;
  folderName?: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Остальные обработчики без изменений
  const openModal = (card: Card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  // Параметры анимации
  const animationStart = 0;
  const animationEnd = 500;
  const minScale = 0.5;
  const stickyTop = 20;

  const scrollProgress = Math.min(1, Math.max(0, (scrollPosition - animationStart) / (animationEnd - animationStart)));
  const scale = Math.max(minScale, 1 - scrollProgress * (1 - minScale));
  
  // Улучшенное вычисление прозрачности
  const textOpacity = 1 - Math.pow(scrollProgress, 2); // Квадратичная функция для более плавного исчезновения
  const textTranslateY = scrollProgress * 20; // Добавим небольшое смещение вниз

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} showCarousel={true} selectedCard={selectedCard} />
      <Modal isOpen={isContactModalOpen} onClose={closeContactModal} showCarousel={false} />

      <div className="relative">
        <div className="fixed inset-0 film-grain opacity-20 pointer-events-none z-50"></div>

        {/* Секция 1 */}
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F3F3] relative overflow-hidden pt-[20vh]">
          <Polaroids />

          {/* Sticky-контейнер для логотипа */}
          <div 
            className="sticky top-5 z-50 w-full flex justify-center mb-4"
            style={{
              height: `${80 * scale}px`,
              marginTop: scrollProgress > 0.9 ? `${stickyTop}px` : '0',
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
                transformOrigin: 'top center',
                willChange: 'transform',
              }}
            >
              <Image
                src="/title.svg"
                alt="Logo"
                width={450}
                height={450}
                priority
              />
            </div>
          </div>

          <p 
            className="max-w-md text-center transition-all duration-500 ease-out"
            style={{
              opacity: textOpacity,
              transform: `translateY(${textTranslateY}px)`,
              pointerEvents: textOpacity > 0 ? 'auto' : 'none',
            }}
          >
            Мы помогаем брендам делать праздники и события атмосферными и запоминающимися на долгие годы
          </p>
        </div>

        {/* Секция 2 */}
        <div className="flex p-10 flex-col items-center bg-[#F3F3F3] min-h-screen relative animate-bg-fade">
          <div className="m-16">
            <Cards onCardClick={openModal} />
          </div>
          <button
            onClick={openContactModal}
            className="bg-[#1f1f1f] cursor-pointer hover:bg-[#000] hover:text-white transition-all duration-300 text-white px-4 py-2 rounded-full absolute bottom-8"
          >
            написать нам
          </button>
        </div>
      </div>
    </>
  );
}