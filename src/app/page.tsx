'use client';
import Image from 'next/image';
import Cards from './cards/page';
import Modal from '../components/Modal';
import Polaroids from '../components/Polaroids';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  useEffect(() => {
    // Простой скрипт для добавления класса при скролле
    const handleScroll = () => {
      const section2 = document.querySelector('.animate-bg-fade');
      if (section2) {
        const rect = section2.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          section2.classList.add('in-view');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} showCarousel={true} />
      <Modal isOpen={isContactModalOpen} onClose={closeContactModal} showCarousel={false} />

      <div className="h-screen overflow-y-scroll snap-y snap-mandatory" style={{ scrollSnapStop: 'always', overscrollBehaviorY: 'none' }}>
        {/* 1 */}
        <div className="flex flex-col items-center justify-center min-h-screen snap-start bg-[#F3F3F3] relative overflow-hidden" style={{ scrollSnapStop: 'always' }}>
          <Polaroids />

          <div className="sticky top-8 z-10 transition-all duration-500">
            <Image src="/title.svg" alt="Next.js" width={450} height={450} />
          </div>
          <p className="max-w-md text-center mt-4">Мы помогаем брендам делать праздники и события атмосферными и запоминающимися на долгие годы</p>
          <button onClick={openModal} className="bg-black text-white px-4 py-2 rounded-full absolute bottom-8">написать нам</button>
        </div>

                 {/* 2 */}
                   <div className="flex p-10 flex-col items-center min-h-screen snap-start relative animate-bg-fade" style={{ scrollSnapStop: 'always' }}>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <Image src="/title.svg" alt="Next.js" width={200} height={200} />
          </div>
          <div className="m-16">
            <Cards />
          </div>
          <button onClick={openModal} className="bg-black text-white px-4 py-2 rounded-full absolute bottom-8">написать нам</button>
        </div>

        {/* 3 */}
        <div className="flex flex-col min-h-screen snap-start bg-[#FFFFFF] relative" style={{ scrollSnapStop: 'always' }}>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <Image src="/title.svg" alt="Next.js" width={200} height={200} />
          </div>

          <div className="flex flex-col items-center justify-center flex-1">
            <div>
              <Image src="/ladys.svg" alt="Next.js" width={200} height={200} />
            </div>
            <p className="max-w-md text-center mt-4">Московская помпания это союз Светланы Мухиной — Ex. главреда GQ и со-основателя доствки цветов Lupine, и Дарьи Ледневой —, основанный в начале 2024 года</p>
          </div>

          <button onClick={openContactModal} className="bg-black text-white px-4 py-2 rounded-full absolute bottom-8 left-1/2 transform -translate-x-1/2">написать нам</button>
        </div>
      </div>
    </>
  );
}