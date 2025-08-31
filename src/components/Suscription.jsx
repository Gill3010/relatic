import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { ExternalLink } from "lucide-react";
export default function Suscription() {
  // Estado inicial con todos los campos definidos
  const initialState = {
    email: "",
    pais: "",
    cedula: "",
    pasaporte: "",
    afiliacion: "",
    orcid: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    edad: "",
    genero: "",
    grado: "",
    actividad: "",
    area: "",
    palabrasClave: "",
    foto: null,
    comprobantePago: null
  };

  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: prev[name] ? [...prev[name], value] : [value],
      }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const email = formData.email || "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Por favor ingrese un correo electrónico válido.");
      return;
    }

    const rawOrcid = formData.orcid || "";
    const orcidRegex = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/;
    if (!orcidRegex.test(rawOrcid)) {
      setStatus("error");
      setMessage("El ORCID debe tener el formato XXXX-XXXX-XXXX-XXXX y puede terminar en un número o la letra 'X'.");
      return;
    }

    const orcidConPrefijo = `https://orcid.org/${rawOrcid}`;
    const data = new FormData();

    for (const key in formData) {
      if (key === "orcid") {
        data.append(key, orcidConPrefijo);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch("https://relaticpanama.org/api/submit_suscriptions.php", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setMessage("Formulario enviado correctamente.");
        
        // Resetear el estado del formulario
        setFormData(initialState);
        
        // Resetear los elementos del formulario en el DOM
        e.target.reset();
      } else {
        setStatus("error");
        setMessage(result.message || "Hubo un problema al enviar.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Error al conectar con el servidor.");
    }
  };

  const labelStyle = "block text-sm font-semibold text-slate-700 mb-2";
  const inputStyle =
    "w-full bg-white text-slate-700 placeholder-slate-500 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-colors duration-300";

  return (
    <motion.form
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 bg-white text-slate-700"
    >
     <h1 className="text-3xl font-bold text-center text-slate-800 mb-3">
  Formulario de Suscripción a RELATIC-PANAMÁ
</h1>

<h2 className="text-lg text-center text-slate-600 mb-8 font-medium">
  MEMBRESÍA
</h2>

<p className="text-sm text-red-400 text-center mt-4 mb-6">
  Todos los campos marcados con un asterisco rojo (*) son obligatorios.
</p>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: "email", label: "Email", required: true },
          { id: "pais", label: "País", required: true },
          { id: "cedula", label: "Cédula / DNI", required: true },
          { id: "pasaporte", label: "Pasaporte / DNI" },
          { id: "afiliacion", label: "Afiliación", required: true },
          { id: "orcid", label: "ORCID", required: true },
          { id: "primerNombre", label: "Primer nombre", required: true },
          { id: "segundoNombre", label: "Segundo nombre" },
          { id: "primerApellido", label: "Primer apellido", required: true },
          { id: "segundoApellido", label: "Segundo apellido" },
        ].map(({ id, label, required }) => (
          <div key={id}>
            <label htmlFor={id} className={labelStyle}>
              {label}
              {id === "afiliacion" && (
                <span className="text-slate-500 text-xs ml-2">(Ej: Universidad de Panamá)</span>
              )}
              {id === "orcid" && (
                <span className="text-slate-500 text-xs ml-2">(Ej: 0000-0002-1825-0097)</span>
              )}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {id === "pais" ? (
              <select
                id={id}
                name={id}
                required
                onChange={handleChange}
                className={inputStyle}
                value={formData.pais || ""}
              >
                <option value="" disabled>Seleccione su país</option>
                {[
                  "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica", "Cuba", "Ecuador", "El Salvador",
                  "España", "Guatemala", "Honduras", "México", "Nicaragua", "Panamá", "Paraguay", "Perú", "República Dominicana",
                  "Uruguay", "Venezuela", "Estados Unidos", "Canadá", "Otros"
                ].map((pais) => (
                  <option key={pais} value={pais} className="text-slate-700">
                    {pais}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id={id}
                name={id}
                required={required}
                onChange={handleChange}
                value={formData[id] || ""}
                placeholder={
                  id === "cedula"
                    ? "Ej: 8-999-999 (formato Panamá) o documento nacional"
                    : id === "pasaporte"
                    ? "Ej: A12345678 (número internacional)"
                    : id === "orcid"
                    ? "XXXX-XXXX-XXXX-XXXX (formato ORCID)"
                    : `Ingrese su ${label.toLowerCase()}`
                }
                className={inputStyle}
              />
            )}

            {id === "orcid" && (
              <p className="text-sm text-slate-500 mt-1">
                Si no tienes ORCID, créalo{" "}
                <Link to="/crear-orcid" className="underline text-blue-600 hover:text-blue-500">
                  aquí
                </Link>
                .
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[{
          name: "edad",
          label: "Edad",
          options: ["18 a 30 años", "31 a 50 años", "51 a 70 años", "más de 71 años"],
        }, {
          name: "genero",
          label: "Género",
          options: ["Femenino", "Masculino"],
        }, {
          name: "grado",
          label: "Grado académico",
          options: ["Postdoctor", "Doctor", "Maestría", "Licenciatura", "Técnico Superior"],
        }, {
          name: "actividad",
          label: "Actividad actual",
          options: ["Profesor", "Investigador", "Estudiante", "Administrativo", "Otros"],
        }, {
          name: "area",
          label: "Área de conocimiento o trabajo",
          options: ["Ciencias Sociales y Humanidades", "Ciencias Naturales y Exactas", "Ciencias de la Salud", "Ciencias Administrativas", "Otros"],
        }].map(({ name, label, options }) => (
          <div key={name}>
            <label htmlFor={name} className={labelStyle}>
              {label}<span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id={name}
              name={name}
              onChange={handleChange}
              className={inputStyle}
              value={formData[name] || ""}
              required
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {options.map((opt) => (
                <option key={opt} value={opt} className="text-slate-700">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <label htmlFor="palabrasClave" className={labelStyle}>
          Palabras clave
          <span className="text-slate-500 text-xs ml-2">(Ej: Tecnología, Innovación, Educación)</span>
        </label>
        <textarea
          id="palabrasClave"
          name="palabrasClave"
          rows={3}
          onChange={handleChange}
          value={formData.palabrasClave || ""}
          placeholder="3 a 5 palabras relacionadas con su actividad académica o profesional; separadas por comas"
          className={`${inputStyle} resize-none`}
        />
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <label className={labelStyle}>
            Foto tamaño carnet<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="file"
            name="foto"
            accept=".jpg,.jpeg,.png"
            required
            onChange={handleChange}
            className="w-full text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-slate-700 font-semibold">Precio: $30 USD</p>
          <label className={labelStyle}>
            Comprobante de pago <span className="text-slate-500 text-xs ml-2">(Opcional)</span>
          </label>
          <input
            type="file"
            name="comprobantePago"
            onChange={handleChange}
            className="w-full text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>
      </div>

      <div className="mt-8 space-y-4">
  <h3 className="text-xl font-bold text-slate-800">Métodos de Pago</h3>

{/* Nuevo texto sobre pago con tarjeta de crédito */}
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
    {/* Logos */}
    <div className="flex flex-col items-center sm:items-start gap-2 flex-shrink-0 w-full sm:w-auto">
      <div className="flex justify-center sm:justify-start items-center gap-2 w-full">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
          alt="Visa"
          className="h-6 sm:h-7 w-auto object-contain"
          loading="lazy"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
          alt="Mastercard"
          className="h-6 sm:h-7 w-auto object-contain"
          loading="lazy"
        />
      </div>
      
      {/* Botón agregado debajo de los logos - Ancho completo en desktop */}
      <a
        href="mailto:administracion@relaticpanama.org"
        className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-blue-500 text-sm flex items-center justify-center gap-2 w-full sm:w-full md:max-w-[200px] mt-2"
      >
        <ExternalLink className="w-4 h-4" />
        <span>Ir al pago</span>
      </a>
    </div>

    {/* Texto */}
    <p className="text-blue-800 font-semibold text-sm sm:text-base leading-snug">
      Si realiza el pago con tarjeta de crédito, por favor envíe un correo a 
      <a
        href="mailto:administracion@relaticpanama.org"
        className="text-blue-600 underline ml-1 break-words"
      >
        administracion@relaticpanama.org
      </a>{" "}
      indicando esta modalidad, para que podamos remitirle el enlace correspondiente y completar su pago.
    </p>
  </div>
</div>


  {/* Banco General */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-slate-50 border border-slate-200 rounded-lg p-4">
    <div className="flex items-center gap-3">
      <img 
        src="https://www.bgeneral.com/wp-content/uploads/2025/01/bglogo70-400x72-2-300x54.png" 
        alt="Banco General" 
        className="h-6 w-auto object-contain"
      />
      <div>
        <p className="font-semibold text-slate-800">Banco General</p>
        <p className="text-slate-600 text-sm">Cuenta Corriente: <span className="font-medium text-slate-800">03-78-01-089981-8</span></p>
        <p className="text-slate-600 text-sm">Nombre: Multi Servicios TK</p>
      </div>
    </div>
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText("03-78-01-089981-8")}
      className="mt-3 md:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-500"
    >
      Copiar
    </button>
  </div>

  {/* Yappy */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-slate-50 border border-slate-200 rounded-lg p-4">
    <div className="flex items-center gap-3">
      <img 
        src="https://www.yappy.com.pa/wp-content/uploads/2021/06/yappy-landscape-200x50.png" 
        alt="Yappy" 
        className="h-6 w-auto object-contain"
      />
      <div>
        <p className="font-semibold text-slate-800">Yappy</p>
        <p className="text-slate-600 text-sm">Directorio: <span className="font-medium text-slate-800">@multiservicio</span></p>
        <p className="text-slate-600 text-sm">Nombre: Multiservicios TK</p>
      </div>
    </div>
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText("@multiservicio")}
      className="mt-3 md:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-500"
    >
      Copiar
    </button>
  </div>

  {/* PayPal */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-slate-50 border border-slate-200 rounded-lg p-4">
    <div className="flex items-center gap-3">
      <img 
        src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg" 
        alt="PayPal" 
        className="h-6 w-auto object-contain"
      />
      <div>
        <p className="font-semibold text-slate-800">PayPal</p>
        <p className="text-slate-600 text-sm">Usuario: <span className="font-medium text-slate-800">@multiserviciostk</span></p>
        <p className="text-slate-600 text-sm">Ubicación: Panamá, Panamá</p>
      </div>
    </div>
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText("@multiserviciostk")}
      className="mt-3 md:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-500"
    >
      Copiar
    </button>
  </div>

  {/* Interbank */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-slate-50 border border-slate-200 rounded-lg p-4">
    <div className="flex items-center gap-3">
      <img 
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYxIiBoZWlnaHQ9IjQ5IiB2aWV3Qm94PSIwIDAgMjYxIDQ5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHJlY3QgeD0iMCIgeT0iMTQiIHdpZHRoPSI3NiIgaGVpZ2h0PSIzNiIgcng9IjMiIGZpbGw9IiMyNDU2QTQiLz4NCjxwYXRoIGQ9Ik05IDE5SDI2VjI3SDlWMTlaTTkgMzFIMjZWMzlIOVYzMVoiIGZpbGw9IndoaXRlIi8+DQo8dGV4dCB4PSI4OCIgeT0iMzMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMwMEJGNjMiPkludGVyYmFuazwvdGV4dD4NCjwvc3ZnPg==" 
        alt="Interbank" 
        className="h-6 w-auto object-contain"
      />
      <div>
        <p className="font-semibold text-slate-800">Interbank</p>
        <p className="text-slate-600 text-sm">Cuenta de Ahorros: <span className="font-medium text-slate-800">898-346625274-5</span></p>
        <p className="text-slate-600 text-sm">CCI: <span className="font-medium text-slate-800">003-898-013466252745-43</span></p>
        <p className="text-slate-600 text-sm">Titular: Poma Gonzáles Sósimo Misael</p>
      </div>
    </div>
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText("898-346625274-5")}
      className="mt-3 md:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-500"
    >
      Copiar
    </button>
  </div>
</div>


      <button
        type="submit"
        className="w-full mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {status === "loading" ? (
          <span>Enviando...</span>
        ) : (
          <span>Enviar formulario</span>
        )}
      </button>

      {status === "success" && (
        <p className="mt-4 text-green-600 font-medium text-center">{message}</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600 font-medium text-center">{message}</p>
      )}
    </motion.form>
  );
}