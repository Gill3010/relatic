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
    <section className="bg-azulOscuro py-8 w-full">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-3xl font-semibold text-blancoTexto mb-12">¡Contáctanos!</h2>

        {submitted && (
          <p className="text-verdeBoton mb-4">¡Gracias! Tu mensaje ha sido enviado con éxito.</p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto bg-azulOscuro p-8 rounded-xl shadow-lg w-full">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full px-4 py-3 border border-grisClaro rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-blancoTexto bg-azulOscuro placeholder:text-grisClaro"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full px-4 py-3 border border-grisClaro rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-blancoTexto bg-azulOscuro placeholder:text-grisClaro"
            />
            <textarea
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Asunto"
              className="w-full px-4 py-3 border border-grisClaro rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-32 resize-none text-blancoTexto bg-azulOscuro placeholder:text-grisClaro"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-verdeBoton text-blancoTexto rounded-full font-medium hover:bg-teal-600 transition duration-300"
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
