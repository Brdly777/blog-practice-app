import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
}

const AboutCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia la imagen cada 5 segundos (5000 milisegundos)

    return () => clearInterval(interval); // Limpia el temporizador cuando el componente se desmonta
  }, [images.length]); // Ejecuta el efecto cada vez que cambia la longitud del arreglo de imágenes

  return (
    <div className="relative h-50">
      <div className="overflow-hidden h-full rounded-xl">
        <img
          className="w-full object-cover h-[255px]"
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex}`}
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold p-2">
        <a href="/" className="block hover:scale-110">
          <h1 className="font-qwitchergrypen-bold text-7xl md:text-8xl">Mundo</h1>
          <h1 className="font-qwitchergrypen-bold text-7xl md:text-8xl -mt-9">Artesano</h1>
        </a>
      </div>
    </div>
  );
};

export default AboutCarousel;
