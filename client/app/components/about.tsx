'use client'
import React from 'react';
import AboutCarousel from './aboutCarousel';
import { PiSealCheck } from "react-icons/pi";
import { GiMexico } from "react-icons/gi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";

export default function AboutComponent() {
  const images = [
    'https://cdn.shopify.com/s/files/1/2645/8894/files/DecoracionArtesanal_8.jpg?v=1692979205%22',
    'https://cdn.shopify.com/s/files/1/2645/8894/files/DecoracionArtesanal_1.jpg?v=1692979206%22',
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <AboutCarousel images={images} />
        <h1 className="font-montserrat-regular text-xl md:text-2xl text-center mt-6">De nuestras manos a las tuyas:</h1>
        <h1 className="font-montserrat-regular text-xl md:text-2xl text-center">arte, cultura y tradición en cada pieza.</h1>
        <div className="flex justify-center mt-2 mb-4">
          <div className="w-64 h-1 bg-neutral-300"></div>
        </div>
        <h1 className="font-poppins-light text-sm md:text-base text-center mb-2">En Mundo Artesano, nos dedicamos a conectar a talentosos artesanos con personas que valoran la autenticidad y la artesanía única.</h1>
        <h1 className="font-poppins-light text-sm md:text-base text-center mb-2">Somos el puente entre el creador y el apasionado del arte, facilitando un espacio donde los artesanos pueden mostrar sus creaciones y los clientes pueden descubrir y adquirir productos únicos y significativos. Nuestro objetivo es apoyar a los artesanos al proporcionarles una plataforma para exhibir y vender sus obras, mientras ofrecemos a los clientes la oportunidad de descubrir y poseer piezas únicas cargadas de historia, tradición y amor por el oficio.</h1>
        <h1 className="font-poppins-light text-sm md:text-base text-center mb-20">En Mundo Artesano, creemos en el poder de la conexión humana a través del arte y la artesanía, y nos esforzamos por promover y preservar estas formas de expresión cultural en un mundo cada vez más digitalizado. ¡Únete a nosotros en nuestro viaje para celebrar la creatividad y la autenticidad!</h1>
        <div className="flex justify-center flex-wrap mb-12">
          <div className="flex flex-col items-center mx-12 w-40 mb-8">
            <div className="bg-gray-300 rounded-full p-4 mb-2"><GiMexico className='h-16 w-16 text-black' /></div>
            <h2 className="font-poppins text-lg text-center">Envíos en toda la república</h2>
          </div>
          <div className="flex flex-col items-center mx-12 w-40 mb-8">
            <div className="bg-gray-300 rounded-full p-4 mb-2"><PiSealCheck className='h-16 w-16 text-black' /></div>
            <h2 className="font-poppins text-lg text-center">Mejor calidad</h2>
          </div>
          <div className="flex flex-col items-center mx-12 w-40 mb-8">
            <div className="bg-gray-300 rounded-full p-4 mb-2"><MdOutlineLocalOffer className='h-16 w-16 text-black' /></div>
            <h2 className="font-poppins text-lg text-center">Mejores ofertas</h2>
          </div>
          <div className="flex flex-col items-center mx-12 w-40 mb-8">
            <div className="bg-gray-300 rounded-full p-4 mb-2"><RiSecurePaymentLine className='h-16 w-16 text-black' /></div>
            <h2 className="font-poppins text-lg text-center">Pagos seguros</h2>
          </div>
        </div>
      </div>
    </>
  );
}
