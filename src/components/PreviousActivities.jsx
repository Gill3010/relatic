import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Gallery() {
    const images = [
        { src: "/assets/IE1.jpg", title: "Ponencia 1", description: "Presentación sobre métodos cualitativos." },
        { src: "/assets/IE2.jpg", title: "Ponencia 2", description: "Análisis de estudios de caso en educación." },
        { src: "/assets/IE3.jpg", title: "Discusión", description: "Interacción entre investigadores y asistentes." },
        { src: "/assets/IE4.jpg", title: "Panel", description: "Expertos debatiendo enfoques cualitativos." },
        { src: "/assets/IE5.jpg", title: "Taller", description: "Aprendizaje práctico sobre técnicas de análisis." },
        { src: "/assets/IE6.jpg", title: "Participantes", description: "Investigadores compartiendo experiencias." },
        { src: "/assets/IE7.jpg", title: "Cierre del evento", description: "Conclusiones y despedida del encuentro." },
        { src: "/assets/IE8.jpg", title: "Networking", description: "Espacio de conexión entre asistentes." }
    ];

    const topSettings = {
        dots: true,
        infinite: true,
        speed: 250,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        rtl: false,
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

    const bottomSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        rtl: true,
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
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                <span className="text-[#2d2e77]">I Encuentro de Investigaciones Cualitativas</span>
            </h2>
            <p className="text-center text-[#2d2e77] mb-6">
                Ciudad de Panamá - Octubre 2024
            </p>

            <Slider {...topSettings} className="mb-6">
                {images.slice(0, 4).map((item, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden mx-2">
                        <div className="w-full h-56 flex justify-center items-center bg-gray-200">
                            <img
                                src={item.src}
                                alt={item.title}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <div className="p-4 bg-gradient-to-t from-[#1a1b59] via-[#1a3aa0] to-[#1a8fe3] text-white">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>

            <Slider {...bottomSettings}>
                {images.slice(4, 8).map((item, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden mx-2">
                        <div className="w-full h-56 flex justify-center items-center bg-gray-200">
                            <img
                                src={item.src}
                                alt={item.title}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <div className="p-4 bg-gradient-to-t from-[#1a1b59] via-[#1a3aa0] to-[#1a8fe3] text-white">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}