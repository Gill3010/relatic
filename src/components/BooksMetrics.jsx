import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

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
      <div className="text-center py-4 text-gray-600 animate-pulse text-sm">
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

  const pieData = [
    { name: 'Libros', value: metrics.books },
    { name: 'Autores', value: metrics.authors },
  ];

  const COLORS = ['#00bcd4', '#4caf50'];

  return (
    <section
      className="w-full px-3 py-4 max-w-5xl mx-auto"
      data-aos="fade-up"
    >
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-[#0a2d4d]">
        📊 Métricas de Libros Digitales
      </h2>

      {/* Tarjetas */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 mb-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border backdrop-blur-lg bg-white/10 rounded-xl p-3 text-center transition-all hover:scale-105 hover:shadow-md"
            style={{ borderColor: '#2563EBE6' }}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div className="text-lg font-bold text-[#0a2d4d]">{card.value}</div>
            <div className="text-xs text-gray-700">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Gráfico compacto */}
      <div
        className="bg-white/10 backdrop-blur-lg rounded-xl p-3 shadow-md"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <h3 className="text-center text-[#0a2d4d] text-sm font-semibold mb-3">
          Distribución de métricas
        </h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={40}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Leyenda minimalista */}
        <div className="flex justify-center gap-4 mt-2 text-xs text-gray-700">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-[#00bcd4] inline-block" />
            Libros
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-[#4caf50] inline-block" />
            Autores
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksMetrics;