// import { useEffect, useState } from 'react';

// const MetricsCards = () => {
//   const [metrics, setMetrics] = useState(null);

//   useEffect(() => {
//     fetch('https://relaticpanama.org/_events/api/journalMetrics.php')
//       .then(res => res.json())
//       .then(data => {
//         if (data.status === 'success') {
//           setMetrics(data.data);
//         }
//       })
//       .catch(err => console.error('Error fetching metrics:', err));
//   }, []);

//   if (!metrics) {
//     return (
//       <div className="text-center py-10 text-gray-600 animate-pulse w-full">
//         Cargando métricas...
//       </div>
//     );
//   }

//   const cards = [
//     { label: 'Revistas', value: metrics.journals, icon: '📚' },
//     { label: 'Artículos', value: metrics.articles, icon: '📄' },
//     { label: 'Autores', value: metrics.authors, icon: '👥' },
//     {
//       label: 'Años Activos',
//       value: `${metrics.first_year} - ${metrics.last_year}`,
//       icon: '📅',
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
//       {cards.map((card, index) => (
//         <div
//           key={index}
//           className="bg-white/40 border border-white/30 backdrop-blur-lg shadow-lg rounded-2xl p-6 text-center transition-all hover:scale-105 hover:shadow-xl w-full"
//         >
//           <div className="text-4xl mb-2">{card.icon}</div>
//           <div className="text-2xl font-bold text-[#0a2d4d]">{card.value}</div>
//           <div className="text-sm text-gray-700">{card.label}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MetricsCards;