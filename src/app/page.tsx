'use client';
import Image from 'next/image';
import Cards from './cards/page';
import Modal from '../components/Modal';
import { useState } from 'react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

    return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} showCarousel={true} />
      <Modal isOpen={isContactModalOpen} onClose={closeContactModal} showCarousel={false} />

      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
  
      <div className="flex flex-col items-center justify-center min-h-screen snap-start bg-[#F3F3F3] relative overflow-hidden">
        {/* Mini Polaroids around the logo */}
        <div className="absolute top-26 left-1/2 transform -translate-x-1/2 rotate-2">
          <div className="w-20 h-24 bg-white shadow-md p-1 flex flex-col" style={{borderRadius: '3px'}}>
            <div className="bg-gray-100 flex-1">
              <Image src="/3.svg" alt="Mini polaroid" width={80} height={60} className="w-full h-full object-cover" />
            </div>
            <div className="text-center pt-1">
              <p className="text-[6px] text-gray-800 uppercase">офис</p>
            </div>
          </div>
        </div>

        <div className="absolute top-54 left-68 transform -rotate-8">
          <div className="w-20 h-24 bg-white shadow-md p-1 flex flex-col" style={{borderRadius: '3px'}}>
            <div className="bg-gray-100 flex-1">
              <Image src="/3.svg" alt="Mini polaroid" width={80} height={60} className="w-full h-full object-cover" />
            </div>
            <div className="text-center pt-1">
              <p className="text-[6px] text-gray-800 uppercase">кафе</p>
            </div>
          </div>
        </div>

        <div className="absolute top-20 left-30 transform rotate-12">
          <div className="w-20 h-24 bg-white shadow-md p-1 flex flex-col" style={{borderRadius: '3px'}}>
            <div className="bg-gray-100 flex-1">
              <Image src="/3.svg" alt="Mini polaroid" width={80} height={60} className="w-full h-full object-cover" />
            </div>
            <div className="text-center pt-1">
              <p className="text-[6px] text-gray-800 uppercase">магазин</p>
            </div>
          </div>
        </div>

        <div className="absolute top-36 right-46 transform -rotate-6">
          <div className="w-20 h-24 bg-white shadow-md p-1 flex flex-col" style={{borderRadius: '3px'}}>
            <div className="bg-gray-100 flex-1">
              <Image src="/3.svg" alt="Mini polaroid" width={80} height={60} className="w-full h-full object-cover" />
            </div>
            <div className="text-center pt-1">
              <p className="text-[6px] text-gray-800 uppercase">ресторан</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-35 left-60 transform rotate-3">
          <div className="w-20 h-24 bg-white shadow-md p-1 flex flex-col" style={{borderRadius: '3px'}}>
            <div className="bg-gray-100 flex-1">
              <Image src="/3.svg" alt="Mini polaroid" width={80} height={60} className="w-full h-full object-cover" />
            </div>
            <div className="text-center pt-1">
              <p className="text-[6px] text-gray-800 uppercase">событие</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 right-20 transform -rotate-12">
          <div className="w-20 h-24 bg-white shadow-md p-1 flex flex-col" style={{borderRadius: '3px'}}>
            <div className="bg-gray-100 flex-1">
              <Image src="/3.svg" alt="Mini polaroid" width={80} height={60} className="w-full h-full object-cover" />
            </div>
            <div className="text-center pt-1">
              <p className="text-[6px] text-gray-800 uppercase">декор</p>
            </div>
          </div>
        </div>

        <div className="sticky top-8 z-10 transition-all duration-500">
          <Image src="/title.svg" alt="Next.js" width={450} height={450} />
        </div>
        <p className="max-w-md text-center mt-4">Мы помогаем брендам делать праздники и события атмосферными и запоминающимися на долгие годы</p>
        <button onClick={openModal} className="bg-black text-white px-4 py-2 rounded-full absolute bottom-8">написать нам</button>
      </div>
      
         
      <div className="flex p-10 flex-col items-center min-h-screen snap-start bg-[#C8C8C8] relative">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <Image src="/title.svg" alt="Next.js" width={200} height={200} />
        </div>
        <div className="m-16">
          <Cards />
        </div>
        <button onClick={openModal} className="bg-black text-white px-4 py-2 rounded-full absolute bottom-8">написать нам</button>
      </div>
      
     
                 <div className="flex flex-col min-h-screen snap-start bg-[#FFFFFF] relative">
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