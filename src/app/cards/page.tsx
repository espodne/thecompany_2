import Image from 'next/image';

export default function Cards() {
  const cards = [
    { id: 1,  image: "/3.svg", text: "сделали оформление магазинов для 12storeez в Москве", date: "декабрь-2024", rotation: "rotate-[-4deg]" },
    { id: 2,  image: "/3.svg", text: "сделали оформление магазинов для 12storeez в Москве", date: "декабрь-2024", rotation: "-rotate-[-2deg]" },
    { id: 3,  image: "/3.svg", text: "сделали оформление магазинов для 12storeez в Москве", date: "декабрь-2024", rotation: "rotate-[1.5deg]" },
    { id: 4, image: "/3.svg", text: "Оформили ресторан “за крышей” к долгожданному отрытию", date: "декабрь-2024", rotation: "rotate-[1deg]" },
    { id: 5, image: "/3.svg", text: "Оформление магазина “Lupine” в Москве", date: "декабрь-2024", rotation: "rotate-[-2deg]" },
    { id: 6,  image: "/3.svg", text: "Оформление магазина “Lupine” в Москве", date: "декабрь-2024", rotation: "rotate-[-3deg]" },
  ];

  return (
    <div className="w-full h-[1500px] max-w-4xl px-4">
      <div className="columns-2 gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${card.rotation}  h-[420px] w-[350px] bg-white shadow-lg mb-8 break-inside-avoid transform transition-transform hover:scale-105 hover:rotate-0 p-3 flex flex-col`}
            style={{
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            }}
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