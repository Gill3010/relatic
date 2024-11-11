import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.subject) {
      console.log(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '' });
    } else {
      alert('Por favor, completa todos los campos');
    }
  };

  return (
    <section className="bg-[#071C37] py-8 w-full"> {/* Cambié py-16 a py-8 */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-white mb-12">¡Contáctanos!</h2>

        {submitted && (
          <p className="text-green-500 mb-4">¡Gracias! Tu mensaje ha sido enviado con éxito.</p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto bg-[#071C37] p-8 rounded-lg shadow-lg w-full">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white bg-[#071C37] placeholder:text-gray-400"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white bg-[#071C37] placeholder:text-gray-400"
            />
            <textarea
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Asunto"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-32 resize-none text-white bg-[#071C37] placeholder:text-gray-400"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-[#00E6D2] text-white rounded-md hover:bg-teal-600 transition duration-300"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
