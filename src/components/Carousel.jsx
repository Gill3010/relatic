import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Autoplay } from 'swiper';

const Carousel = () => {
  return (
    <div className="w-full mt-10">
      <Swiper
        modules={[Navigation, Autoplay]}  // Usamos los módulos Navigation y Autoplay
        spaceBetween={20}  // Espacio entre las imágenes
        slidesPerView={1}  // Mostrar una imagen por vez
        loop={true}  // Carrusel infinito
        autoplay={{
          delay: 2500,  // Intervalo de 2.5 segundos entre cada imagen
          disableOnInteraction: false,  // Continúa automáticamente incluso si el usuario interactúa
        }}
        navigation  // Habilita los botones de navegación (anterior/siguiente)
      >
        <SwiperSlide>
          <img src="/image1.jpg" alt="Imagen 1" className="w-full h-auto rounded-xl shadow-lg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image2.jpg" alt="Imagen 2" className="w-full h-auto rounded-xl shadow-lg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image3.jpg" alt="Imagen 3" className="w-full h-auto rounded-xl shadow-lg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image4.jpg" alt="Imagen 4" className="w-full h-auto rounded-xl shadow-lg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
