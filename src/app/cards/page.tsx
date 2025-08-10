'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface Card {
  id: number;
  image: string;
  text: string;
  date: string;
  rotation: string;
}

interface CardsProps {
  onCardClick?: () => void;
}

export default function Cards({ onCardClick }: CardsProps = {}) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  // Статичные данные как fallback
  const defaultCards = [
    { id: 1, image: "/3.svg", text: "сделали оформление магазинов для 12storeez в Москве", date: "декабрь-2024", rotation: "rotate-[-4deg]" },
    { id: 2, image: "/3.svg", text: "сделали оформление магазинов для 12storeez в Москве", date: "декабрь-2024", rotation: "-rotate-[-2deg]" },
    { id: 3, image: "/3.svg", text: "сделали оформление магазинов для 12storeez в Москве", date: "декабрь-2024", rotation: "rotate-[1.5deg]" },
    { id: 4, image: "/3.svg", text: `Оформили ресторан "за крышей" к долгожданному отрытию`, date: "декабрь-2024", rotation: "rotate-[1deg]" },
    { id: 5, image: "/3.svg", text: `Оформление магазина "Lupine" в Москве`, date: "декабрь-2024", rotation: "rotate-[-2deg]" },
    { id: 6, image: "/3.svg", text: `Оформление магазина "Lupine" в Москве`, date: "декабрь-2024", rotation: "rotate-[-3deg]" },
    { id: 7, image: "/3.svg", text: "Проект корпоративного мероприятия", date: "ноябрь-2024", rotation: "rotate-[2deg]" },
    { id: 8, image: "/3.svg", text: "Оформление выставочного стенда", date: "ноябрь-2024", rotation: "rotate-[-1deg]" },
    { id: 9, image: "/3.svg", text: "Декор для частного события", date: "октябрь-2024", rotation: "rotate-[3deg]" },
    { id: 10, image: "/3.svg", text: "Брендинг кафе в центре города", date: "октябрь-2024", rotation: "rotate-[-2.5deg]" },
  ];

  const rotations = ["rotate-[-4deg]", "-rotate-[-2deg]", "rotate-[1.5deg]", "rotate-[1deg]", "rotate-[-2deg]", "rotate-[-3deg]", "rotate-[2deg]", "rotate-[-1deg]", "rotate-[3deg]", "rotate-[-2.5deg]"];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      // Получаем список папок проектов (увеличиваем лимит)
      const { data: folders, error } = await supabase.storage
        .from('project-images')
        .list('', { limit: 20 });

      if (error) throw error;
      
      console.log('Найдено папок:', folders?.length, folders?.map(f => f.name));

      if (folders && folders.length > 0) {
        const cardsWithImages = [];
        let cardIndex = 0;
        
        // Проходим по всем папкам пока не найдем 10 карточек с изображениями
        for (let i = 0; i < folders.length && cardsWithImages.length < 10; i++) {
          const folder = folders[i];
          if (folder.name) {
            // Получаем файлы из папки проекта
            const { data: projectFiles } = await supabase.storage
              .from('project-images')
              .list(folder.name, { limit: 10 });

            // Фильтруем служебные файлы и проверяем что есть реальные изображения
            const realFiles = projectFiles?.filter(file => 
              !file.name.includes('.emptyFolderPlaceholder') && 
              !file.name.startsWith('.')
            );
            
            if (realFiles && realFiles.length > 0) {
              const firstFile = realFiles[0];
              const { data } = supabase.storage
                .from('project-images')
                .getPublicUrl(`${folder.name}/${firstFile.name}`);

              cardsWithImages.push({
                id: cardIndex + 1,
                image: data.publicUrl,
                text: defaultCards[cardIndex]?.text || "Проект компании",
                date: defaultCards[cardIndex]?.date || "2024",
                rotation: rotations[cardIndex % rotations.length]
              });
              
              cardIndex++; // Увеличиваем индекс только при успешном добавлении карточки
            }
            // Если файлов нет - просто пропускаем эту папку и идем к следующей
          }
        }
        
        console.log('Найдено карточек с изображениями:', cardsWithImages.length);
        
        // Если меньше 10 карточек, дополняем fallback данными
        if (cardsWithImages.length < 10) {
          const remaining = 10 - cardsWithImages.length;
          const fallbackCards = defaultCards.slice(cardsWithImages.length, cardsWithImages.length + remaining);
          setCards([...cardsWithImages, ...fallbackCards]);
        } else {
          setCards(cardsWithImages);
        }
      } else {
        setCards(defaultCards);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setCards(defaultCards);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl px-4 flex items-center justify-center" style={{ minHeight: '2000px' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // Вычисляем примерную высоту на основе количества карточек
  const containerHeight = Math.ceil(cards.length / 2) * 450; // ~450px на ряд
  
  return (
    <div className="w-full max-w-4xl px-4" style={{ minHeight: `${containerHeight}px` }}>
      <div className="columns-2 gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${card.rotation} h-[420px] w-[350px] bg-white shadow-lg mb-8 break-inside-avoid p-3 flex flex-col cursor-pointer hover:shadow-xl transition-shadow duration-300`}
            style={{
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            }}
            onClick={onCardClick}
          >
            <div className="bg-white p-2 mb-1">
              <div className="w-full h-[280px]">
                <Image 
                  src={card.image} 
                  alt="Polaroid photo" 
                  width={200} 
                  height={200}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
            <div className="text-center space-y-1 flex flex-col justify-center flex-1">
              <p className="text-sm text-gray-800 leading-tight uppercase">{card.text}</p>
              <p className="text-xs text-black font-mono font-bold uppercase">{card.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}