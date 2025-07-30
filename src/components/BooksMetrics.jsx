import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BooksMetrics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetch('https://relaticpanama.org/_events/api/booksMetrics.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setMetrics(data.data);
        }
      })
      .catch(err => console.error('Error fetching metrics:', err));
  }, []);

  if (!metrics) {
    return (
      <div className="text-center py-6 text-gray-600 animate-pulse text-sm">
        Cargando métricas...
      </div>
    );
  }

  const cards = [
    { label: 'Libros', value: metrics.books },
    { label: 'Autores', value: metrics.authors },
    {
      label: 'Años Activos',
      value: `${metrics.first_year} - ${metrics.last_year}`,
    },
  ];

  return (
    <section
      className="w-full px-4 py-6 max-w-6xl mx-auto"
      data-aos="fade-up"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#0a2d4d]">
        📊 Métricas de Libros Digitales
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border backdrop-blur-lg bg-white/10 rounded-xl p-4 text-center transition-all hover:scale-105 hover:shadow-md"
            style={{ borderColor: '#00bcd4' }}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div className="text-xl font-bold text-[#0a2d4d]">{card.value}</div>
            <div className="text-xs text-gray-700">{card.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BooksMetrics;