import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Card {
  id: number;
  image: string;
  text: string;
  date: string;
  rotation: string;
  folderName?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCarousel?: boolean;
  selectedCard?: Card | null;
}

export default function Modal({ isOpen, onClose, showCarousel = true, selectedCard }: ModalProps) {
  const [slides, setSlides] = useState<{ id: number; image: string }[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);

  // Загружаем изображения при изменении selectedCard
  useEffect(() => {
    if (selectedCard?.folderName) {
      loadProjectImages(selectedCard.folderName);
    } else {
      // Если нет выбранной карточки, показываем пустой слайдер
      setSlides([]);
      setCurrentSlide(0);
      setLoading(false);
    }
  }, [selectedCard]);

  const loadProjectImages = async (folderName: string) => {
    try {
      setLoading(true);
      console.log('Загружаем изображения из папки:', folderName);
      
      const { data: projectFiles, error } = await supabase.storage
        .from('project-images')
        .list(folderName, { limit: 20 });

      if (error) throw error;
      
      console.log('Найдено файлов:', projectFiles?.length, projectFiles?.map(f => f.name));

              if (projectFiles && projectFiles.length > 0) {
          const realFiles = projectFiles.filter(file => 
            !file.name.includes('.emptyFolderPlaceholder') && 
            !file.name.startsWith('.')
          );

          if (realFiles.length === 0) {
            console.log('Нет реальных файлов в папке');
            setSlides([]);
            setCurrentSlide(0);
            return;
          }

          const projectSlides = realFiles.map((file, index) => {
            const { data } = supabase.storage
              .from('project-images')
              .getPublicUrl(`${folderName}/${file.name}`);
            
            console.log('Создаем слайд:', index + 1, 'из файла:', file.name, 'URL:', data.publicUrl);
            
            return {
              id: index + 1,
              image: data.publicUrl
            };
          });

          console.log('Создано слайдов:', projectSlides.length);

          // Создаем бесконечный массив для плавного перехода
          const infiniteSlides = [
            ...projectSlides,
            ...projectSlides,
            ...projectSlides,
          ];

          console.log('Итоговый массив слайдов:', infiniteSlides.length);
          setSlides(infiniteSlides);
          
          // Начинаем с середины (второй копии массива) - это гарантирует возможность листать в обе стороны
          const startPosition = projectSlides.length;
          setCurrentSlide(startPosition);
          console.log('Слайдер инициализирован с позиции:', startPosition, 'из', infiniteSlides.length);
          
          // Проверяем что позиция корректная и позволяет листать в обе стороны
          if (startPosition <= 0) {
            console.error('Некорректная начальная позиция:', startPosition);
            setCurrentSlide(1);
          }
        } else {
          console.log('Папка пустая или нет файлов');
          setSlides([]);
          setCurrentSlide(0);
        }
    } catch (error) {
      console.error('Error loading project images:', error);
      // При ошибке показываем пустой слайдер
      setSlides([]);
      setCurrentSlide(0);
    } finally {
      setLoading(false);
    }
  };



  const nextSlide = () => {
    if (isTransitioning || slides.length === 0) return;
    
    const originalLength = slides.length / 3;
    // Проверяем что мы в безопасной зоне для навигации
    if (currentSlide < originalLength || currentSlide >= originalLength * 2) {
      console.log('Слайдер не в безопасной зоне, исправляем позицию');
      setCurrentSlide(originalLength);
      return;
    }
    
    console.log('Следующий слайд. Текущая позиция:', currentSlide, 'Всего слайдов:', slides.length);
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning || slides.length === 0) return;
    
    const originalLength = slides.length / 3;
    
    // Если слайдер на первой позиции (originalLength), то влево листать нельзя
    if (currentSlide <= originalLength) {
      console.log('Нельзя листать влево - слайдер на первой позиции');
      return;
    }
    
    console.log('Предыдущий слайд. Текущая позиция:', currentSlide, 'Всего слайдов:', slides.length);
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
  };

  // Обработка бесконечности
  React.useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      
      const originalLength = slides.length / 3; // Делим на 3, так как у нас 3 копии
      
      // Если дошли до последней трети (конец массива)
      if (currentSlide >= originalLength * 2) {
        setCurrentSlide(originalLength); // Перепрыгиваем к середине
        console.log('Перепрыгнули к середине (конец)');
      }
      // Если дошли до первой трети (начало массива)  
      else if (currentSlide < originalLength) {
        setCurrentSlide(originalLength); // Перепрыгиваем к середине
        console.log('Перепрыгнули к середине (начало)');
      }
    }, isTransitioning ? 500 : 0);

    return () => clearTimeout(timer);
  }, [currentSlide, slides.length, isTransitioning]);

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
              className={`absolute left-0 top-0 w-1/2 h-full z-10 ${
                slides.length > 0 && currentSlide > slides.length / 3 
                  ? 'cursor-pointer' 
                  : 'cursor-default opacity-30'
              }`}
              onClick={slides.length > 0 && currentSlide > slides.length / 3 ? prevSlide : undefined}
            ></div>
            
            {/* Right click area */}
            <div 
              className="absolute right-0 top-0 w-1/2 h-full z-10 cursor-pointer"
              onClick={nextSlide}
            ></div>

            {/* Carousel */}
            <div className="relative w-full h-96 overflow-hidden">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
              
              {slides.length === 0 && !loading ? (
                <div className="flex items-center justify-center h-full text-white">
                  <p>Нет изображений для отображения</p>
                </div>
              ) : (
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
                      <div className="relative w-full h-full overflow-hidden rounded-md">
                        <Image 
                          src={slide.image} 
                          alt={`Slide ${slide.id}`} 
                          width={360} 
                          height={360}
                          className="w-full h-full object-cover shadow-xl"
                        />
                        <div className="absolute inset-0 film-grain opacity-60 pointer-events-none"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
        <button onClick={onClose} className="bg-white cursor-pointer text-black px-4 py-2 rounded-full">
          Закрыть х
        </button>
      </div>
    </div>
  );
}