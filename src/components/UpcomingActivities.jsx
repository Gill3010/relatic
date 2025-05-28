import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function UpcomingActivities() {
  const images = [
    { src: "/assets/AP1.jpeg", title: "Bienvenida Oficial", description: "Inicio del evento con discurso de apertura." },
    { src: "/assets/AP2.jpeg", title: "Exposición Central", description: "Presentación de innovaciones en el campo." },
    { src: "/assets/AP3.jpeg", title: "Debate Abierto", description: "Intercambio de ideas entre panelistas y público." },
    { src: "/assets/AP4.jpeg", title: "Foro de Expertos", description: "Discusión profunda sobre temas de actualidad." },
    { src: "/assets/AP5.jpeg", title: "Sesión Interactiva", description: "Demostración práctica de técnicas y herramientas." },
    { src: "/assets/AP6.jpeg", title: "Conexión Profesional", description: "Oportunidad para establecer contactos clave." },
    { src: "/assets/AP7.jpeg", title: "Cierre Solemne", description: "Resumen de logros y palabras de despedida." },
];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-[#1a1b59] mb-6">Actividades próximas</h2>
            {/* Banner con Imagen desde public/assets */}
            <div className="rounded-xl mb-6 overflow-hidden">
                <img src="/assets/bannerevento.jpeg" alt="Banner del evento" className="w-full" />
            </div>

            {/* Carrusel */}
            <Slider {...settings}>
                {images.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden mx-2">
                        <div className="w-full h-56 flex justify-center items-center bg-gray-200">
                            <img
                                src={item.src}
                                alt={item.title}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <div className="p-4 bg-[linear-gradient(to_bottom,#00E5FF,#2E332B)]">
  <h3 className="text-lg font-semibold" style={{ color: '#FFFF00' }}>
    {item.title}
  </h3>
  <p className="text-sm" style={{ color: 'white' }}>
    {item.description}
  </p>
</div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}