import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

export default function Suscription() {
  const [formData, setFormData] = useState({});
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
      const res = await fetch("https://relaticpanama.org/api/submit.php", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setMessage("Formulario enviado correctamente.");
        setFormData({});
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

  const labelStyle = "block text-sm font-semibold text-white mb-1";
  const inputStyle =
    "w-full bg-white/10 text-white placeholder-white/70 border border-white/30 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 hover:border-white/50 transition";

  return (
    <motion.form
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto p-10 rounded-2xl shadow-2xl border border-white/10 bg-[linear-gradient(to_bottom,#00E5FF,#2E332B)] text-white"
    >
      <h1 className="text-4xl font-extrabold text-center text-white mb-4 drop-shadow">
        Formulario de Inscripción
      </h1>
      <h2 className="text-lg text-center text-white/80 mb-10 font-medium">
        RELATIC-PANAMA
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: "email", label: "Email", required: true },
          { id: "pais", label: "País", required: true },
          { id: "cedula", label: "Cédula", required: true },
          { id: "pasaporte", label: "Pasaporte" },
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
                <span className="text-white/60 text-xs ml-2">(Ej: Universidad de Panamá)</span>
              )}
              {id === "orcid" && (
                <span className="text-white/60 text-xs ml-2">(Ej: 0000-0002-1825-0097)</span>
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
                defaultValue=""
              >
                <option value="" disabled>Seleccione su país</option>
                {[
                  "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica", "Cuba", "Ecuador", "El Salvador",
                  "España", "Guatemala", "Honduras", "México", "Nicaragua", "Panamá", "Paraguay", "Perú", "República Dominicana",
                  "Uruguay", "Venezuela", "Estados Unidos", "Canadá", "Otros"
                ].map((pais) => (
                  <option key={pais} value={pais} className="text-black">
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
              <p className="text-sm text-white/70 mt-1">
                Si no tienes ORCID, créalo{" "}
                <Link to="/create-orcid-guide" className="underline text-cyan-200 hover:text-cyan-100">
                  aquí
                </Link>
                .
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
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
              defaultValue=""
              required
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {options.map((opt) => (
                <option key={opt} value={opt} className="text-black">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <label htmlFor="palabrasClave" className={labelStyle}>
          Palabras clave
          <span className="text-white/60 text-xs ml-2">(Ej: Tecnología, Innovación, Educación)</span>
        </label>
        <textarea
          id="palabrasClave"
          name="palabrasClave"
          rows={3}
          onChange={handleChange}
          placeholder="3 a 5 palabras relacionadas con su actividad académica o profesional; separadas por comas"
          className={`${inputStyle} resize-none`}
        />
      </div>

      <div className="mt-10 space-y-4">
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
            className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-10 bg-[#FFFF00] text-[#1a1b59] font-bold py-3 rounded-xl shadow-md hover:bg-[#2CFF05] transition-all duration-300"
      >
        {status === "loading" ? "Enviando..." : "Enviar"}
      </button>

      {status === "success" && (
        <p className="mt-4 text-green-400 font-semibold">{message}</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-400 font-semibold">{message}</p>
      )}
    </motion.form>
  );
}