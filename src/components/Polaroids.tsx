import Image from 'next/image';

export default function Polaroids() {
  return (
    <>
      {/* Mini Polaroids around the logo */}
      <div className="absolute top-26 left-1/2 transform -translate-x-1/2 rotate-2">
        <div className="w-20 h-24 bg-white shadow-md p-1 flex flex-col" style={{ borderRadius: '3px' }}>
          <div className="bg-gray-100 flex-1">
            <Image src="/3.svg" alt="Mini polaroid" width={80} height={60} className="w-full h-full object-cover" />
          </div>
          <div className="text-center pt-1">
            <p className="text-[6px] text-gray-800 uppercase">офис</p>
          </div>
        </div>
      </div>

      <div className="absolute top-54 left-68 transform -rotate-8">
        <div className="w-20 h-24 bg-white shadow-md p-1 flex flex-col" style={{ borderRadius: '3px' }}>
          <div className="bg-gray-100 flex-1">
            <Image src="/3.svg" alt="Mini polaroid" width={80} height={60} className="w-full h-full object-cover" />
          </div>
          <div className="text-center pt-1">
            <p className="text-[6px] text-gray-800 uppercase">кафе</p>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-30 transform rotate-12">
        <div className="w-20 h-24 bg-white shadow-md p-1 flex flex-col" style={{ borderRadius: '3px' }}>
          <div className="bg-gray-100 flex-1">
            <Image src="/3.svg" alt="Mini polaroid" width={80} height={60} className="w-full h-full object-cover" />
          </div>
          <div className="text-center pt-1">
            <p className="text-[6px] text-gray-800 uppercase">магазин</p>
          </div>
        </div>
      </div>

      <div className="absolute top-36 right-46 transform -rotate-6">
        <div className="w-20 h-24 bg-white shadow-md p-1 flex flex-col" style={{ borderRadius: '3px' }}>
          <div className="bg-gray-100 flex-1">
            <Image src="/3.svg" alt="Mini polaroid" width={80} height={60} className="w-full h-full object-cover" />
          </div>
          <div className="text-center pt-1">
            <p className="text-[6px] text-gray-800 uppercase">ресторан</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-35 left-60 transform rotate-3">
        <div className="w-20 h-24 bg-white shadow-md p-1 flex flex-col" style={{ borderRadius: '3px' }}>
          <div className="bg-gray-100 flex-1">
            <Image src="/3.svg" alt="Mini polaroid" width={80} height={60} className="w-full h-full object-cover" />
          </div>
          <div className="text-center pt-1">
            <p className="text-[6px] text-gray-800 uppercase">событие</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 right-20 transform -rotate-12">
        <div className="w-20 h-24 bg-white shadow-md p-1 flex flex-col" style={{ borderRadius: '3px' }}>
          <div className="bg-gray-100 flex-1">
            <Image src="/3.svg" alt="Mini polaroid" width={80} height={60} className="w-full h-full object-cover" />
          </div>
          <div className="text-center pt-1">
            <p className="text-[6px] text-gray-800 uppercase">декор</p>
          </div>
        </div>
      </div>
    </>
  );
}