import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  const sectionStyle = "mb-8";
  const headingStyle = "text-xl font-bold text-gray-800 mb-2";
  const subHeadingStyle = "text-lg font-semibold text-gray-700 mt-4 mb-1";
  const paragraphStyle = "text-gray-600 leading-relaxed";
  const listStyle = "list-disc list-inside text-gray-600 ml-4";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full space-y-6 bg-white p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Términos y Condiciones de Relatic Panamá
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          Última actualización: 12 de septiembre de 2025
        </p>

        <div className={sectionStyle}>
          <h2 className={headingStyle}>1. Aceptación de los Términos</h2>
          <p className={paragraphStyle}>
            Al acceder y utilizar el sitio web de Relatic Panamá y sus servicios ("Servicios"), usted acepta estar obligado por estos Términos y Condiciones ("Términos"). Si no está de acuerdo con alguna parte de estos Términos, no debe utilizar nuestros Servicios.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={headingStyle}>2. Política de Privacidad</h2>
          <p className={paragraphStyle}>
            Su privacidad es importante para nosotros. Nuestra <a href="/politica-de-privacidad" className="text-blue-600 hover:text-blue-500 transition-colors font-medium">Política de Privacidad</a> describe cómo recopilamos, usamos, divulgamos y protegemos su información personal. Al aceptar estos Términos, también acepta nuestra Política de Privacidad.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={headingStyle}>3. Uso de los Servicios</h2>
          <p className={paragraphStyle}>
            Usted se compromete a utilizar los Servicios de manera lícita y ética, sin violar los derechos de terceros ni incurrir en actividades fraudulentas o dañinas.
          </p>
          <h3 className={subHeadingStyle}>3.1. Registro de Usuario</h3>
          <p className={paragraphStyle}>
            Para acceder a ciertas funciones, es posible que deba registrarse y proporcionar información precisa y veraz. Usted es responsable de mantener la confidencialidad de su contraseña y de todas las actividades que ocurran bajo su cuenta.
          </p>
          <h3 className={subHeadingStyle}>3.2. Contenido del Usuario</h3>
          <p className={paragraphStyle}>
            Cualquier contenido que usted publique o suba a los Servicios es de su exclusiva responsabilidad. Relatic Panamá se reserva el derecho de eliminar cualquier contenido que considere inapropiado o que viole estos Términos.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={headingStyle}>4. Propiedad Intelectual</h2>
          <p className={paragraphStyle}>
            Todo el contenido del sitio web, incluyendo textos, gráficos, logotipos, iconos, imágenes y software, es propiedad de Relatic Panamá o de sus licenciantes y está protegido por las leyes de propiedad intelectual.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={headingStyle}>5. Limitación de Responsabilidad</h2>
          <p className={paragraphStyle}>
            Relatic Panamá no será responsable por daños indirectos, incidentales, especiales, consecuenciales o punitivos, incluyendo, sin limitación, la pérdida de ganancias, datos, uso, fondo de comercio u otras pérdidas intangibles, que resulten de:
          </p>
          <ul className={listStyle}>
            <li>Su acceso o uso de los Servicios, o la imposibilidad de acceder o usarlos.</li>
            <li>Cualquier conducta o contenido de terceros en los Servicios.</li>
            <li>Acceso no autorizado, uso o alteración de sus transmisiones o contenido.</li>
          </ul>
        </div>

        <div className={sectionStyle}>
          <h2 className={headingStyle}>6. Cambios en los Términos</h2>
          <p className={paragraphStyle}>
            Nos reservamos el derecho de modificar estos Términos en cualquier momento. Le notificaremos sobre cualquier cambio publicando los nuevos Términos en esta página. Es su responsabilidad revisar periódicamente estos Términos para estar al tanto de las actualizaciones.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={headingStyle}>7. Contacto</h2>
          <p className={paragraphStyle}>
            Si tiene alguna pregunta sobre estos Términos, contáctenos en <a href="mailto:administracion@relaticpanama.org" className="text-blue-600 hover:text-blue-500 transition-colors">administracion@relaticpanama.org</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsAndConditions;