import { 
  useState, 
  useEffect 
} from 'react';
import { 
  Menu, 
  X, 
  ChevronDown,
  Newspaper,
} from 'lucide-react';
import { 
  BookOpen, 
  FileText, 
  GraduationCap, 
  ShieldCheck, 
  CalendarCheck, 
  History,
  Globe
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Detect scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  const services = [
  { name: 'Revistas Indexadas', href: 'https://relaticpanama.org/_journals/', icon: Newspaper },
  { name: 'Carteles Digitales', href: 'https://relaticpanama.org/_posters/', icon: FileText },
  { name: 'Libros Digitales', href: 'https://relaticpanama.org/_books/index.php/edrp/inicio', icon: BookOpen },
  { name: 'Aprendizaje Continuo', href: 'https://relaticpanama.org/_classroom/', icon: GraduationCap },
  { name: 'Propiedad Intelectual', href: 'https://relaticpanama.org/_protect/', icon: ShieldCheck }
];

const activities = [
  { name: 'Próximas Actividades', href: '/actividades/proximas', icon: CalendarCheck },
  { name: 'Actividades Anteriores', href: '/actividades/anteriores', icon: History }
];

  // Definir colores basados en si se ha hecho scroll
  const textColor = isScrolled ? 'text-[#0a2d4d]' : 'text-white'; // Texto oscuro para el fondo claro, blanco para el transparente
  const hoverTextColor = isScrolled ? 'hover:text-blue-700' : 'hover:text-purple-300'; // Hover más oscuro para el fondo claro
  const dropdownBg = isScrolled ? 'bg-white/95' : 'bg-gray-800/95'; // Fondo de los dropdowns, blanco para el fondo claro, oscuro para el transparente
  const dropdownHoverBg = isScrolled ? 'hover:bg-gray-100' : 'hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20'; // Hover de los dropdowns
  const dropdownItemTextColor = isScrolled ? 'text-[#0a2d4d]' : 'text-white';
  const dropdownItemHoverTextColor = isScrolled ? 'group-hover:text-blue-700' : 'group-hover:text-purple-300';
  const logoGradientScrolled = isScrolled ? 'from-blue-700 via-purple-800 to-indigo-900' : 'from-blue-500 via-purple-600 to-indigo-700'; // Ajustar color de logo si es necesario

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#00bcd4] shadow-lg' // Fondo azul claro al hacer scroll
        : 'bg-transparent'
    }`}>
      {/* Geometric decorative elements - Ajustar su visibilidad o color si chocan con el nuevo fondo */}
      {/* Podrías querer ocultar o cambiar el color de estos elementos al hacer scroll si no combinan bien */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-2 left-4 sm:left-10 w-6 h-6 sm:w-8 sm:h-8 border border-purple-400/20 transform rotate-45 ${isScrolled ? 'opacity-0' : 'opacity-100'}`} />
        <div className={`absolute top-4 right-8 sm:right-20 w-4 h-4 sm:w-6 sm:h-6 border border-blue-400/20 rounded-full ${isScrolled ? 'opacity-0' : 'opacity-100'}`} />
        <div className={`absolute bottom-2 right-4 sm:right-10 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-400/20 to-blue-400/20 transform rotate-12 ${isScrolled ? 'opacity-0' : 'opacity-100'}`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - Responsive text sizing */}
<div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-shrink">
  <a href="/" className="min-w-0 block flex items-center space-x-2 sm:space-x-3">
    <div className="relative flex-shrink-0">
      {/* Ajustar el gradiente del logo según el scroll si se desea */}
      <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${logoGradientScrolled} rounded-lg flex items-center justify-center shadow-lg`}>
        <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-pulse" />
    </div>
    <div>
      <h1 className={`text-base sm:text-lg lg:text-xl font-bold ${isScrolled ? 'text-[#0a2d4d]' : 'text-white'}`}>
  RELATIC PANAMÁ
</h1>
      <span className={`text-xs sm:text-xs lg:text-xs tracking-wider leading-tight block ${isScrolled ? 'text-[#0a2d4d]' : 'text-gray-300'}`}>
        Red Latinoamericana de Investigaciones Cualitativas
      </span>
    </div>
  </a>
</div>

          {/* Desktop Navigation - Better breakpoint management */}
          <div className="hidden xl:flex items-center space-x-4 2xl:space-x-6">
            <a 
              href="/" 
              className={`${textColor} ${hoverTextColor} transition-colors duration-300 font-medium relative group text-sm 2xl:text-base`}
            >
              Inicio
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${isScrolled ? 'from-blue-700 to-purple-700' : 'from-purple-400 to-blue-400'} transition-all duration-300 group-hover:w-full`} />
            </a>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdown('services');
                }}
                className={`flex items-center space-x-1 ${textColor} ${hoverTextColor} transition-colors duration-300 font-medium relative group text-sm 2xl:text-base`}
              >
                <span>Servicios</span>
                <ChevronDown className={`w-3 h-3 2xl:w-4 2xl:h-4 transition-transform duration-300 ${
                  activeDropdown === 'services' ? 'rotate-180' : ''
                }`} />
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${isScrolled ? 'from-blue-700 to-purple-700' : 'from-purple-400 to-blue-400'} transition-all duration-300 group-hover:w-full`} />
              </button>

              {/* Services Dropdown Menu */}
              {activeDropdown === 'services' && (
                <div className={`absolute top-full left-0 mt-2 w-56 xl:w-64 ${dropdownBg} backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50`}>
                  <div className="p-2">
                    {services.map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <a
                          key={service.name}
                          href={service.href}
                          className={`flex items-center space-x-3 p-2 xl:p-3 rounded-lg ${dropdownHoverBg} transition-all duration-300 group`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className={`w-7 h-7 xl:w-8 xl:h-8 ${isScrolled ? 'bg-blue-500/20' : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20'} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                            <IconComponent className={`w-3 h-3 xl:w-4 xl:h-4 ${isScrolled ? 'text-blue-700' : 'text-purple-300'}`} />
                          </div>
                          <span className={`${dropdownItemTextColor} ${dropdownItemHoverTextColor} transition-colors duration-300 font-medium text-sm xl:text-base`}>
                            {service.name}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <a 
              href="/nosotros" 
              className={`${textColor} ${hoverTextColor} transition-colors duration-300 font-medium relative group text-sm 2xl:text-base`}
            >
              Nosotros
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${isScrolled ? 'from-blue-700 to-purple-700' : 'from-purple-400 to-blue-400'} transition-all duration-300 group-hover:w-full`} />
            </a>

            {/* Activities Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdown('activities');
                }}
                className={`flex items-center space-x-1 ${textColor} ${hoverTextColor} transition-colors duration-300 font-medium relative group text-sm 2xl:text-base`}
              >
                <span>Actividades</span>
                <ChevronDown className={`w-3 h-3 2xl:w-4 2xl:h-4 transition-transform duration-300 ${
                  activeDropdown === 'activities' ? 'rotate-180' : ''
                }`} />
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${isScrolled ? 'from-blue-700 to-purple-700' : 'from-purple-400 to-blue-400'} transition-all duration-300 group-hover:w-full`} />
              </button>

              {/* Activities Dropdown Menu */}
              {activeDropdown === 'activities' && (
                <div className={`absolute top-full left-0 mt-2 w-56 xl:w-64 ${dropdownBg} backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50`}>
                  <div className="p-2">
                    {activities.map((activity) => {
                      const IconComponent = activity.icon;
                      return (
                        <a
                          key={activity.name}
                          href={activity.href}
                          className={`flex items-center space-x-3 p-2 xl:p-3 rounded-lg ${dropdownHoverBg} transition-all duration-300 group`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className={`w-7 h-7 xl:w-8 xl:h-8 ${isScrolled ? 'bg-blue-500/20' : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20'} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                            <IconComponent className={`w-3 h-3 xl:w-4 xl:h-4 ${isScrolled ? 'text-blue-700' : 'text-purple-300'}`} />
                          </div>
                          <span className={`${dropdownItemTextColor} ${dropdownItemHoverTextColor} transition-colors duration-300 font-medium text-sm xl:text-base`}>
                            {activity.name}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <a 
              href="https://relaticpanama.org/_blog/" 
              className={`${textColor} ${hoverTextColor} transition-colors duration-300 font-medium relative group text-sm 2xl:text-base`}
            >
              Blog
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${isScrolled ? 'from-blue-700 to-purple-700' : 'from-purple-400 to-blue-400'} transition-all duration-300 group-hover:w-full`} />
            </a>

            {/* CTA Button - Responsive sizing */}
          <a
  href="/suscription"
  className={`relative px-4 py-2 xl:px-6 xl:py-2 bg-gradient-to-r ${isScrolled ? 'from-blue-700 via-purple-800 to-indigo-900' : 'from-purple-600 via-blue-600 to-indigo-700'} text-white rounded-full font-semibold hover:from-purple-500 hover:via-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg ${isScrolled ? 'hover:shadow-blue-500/25' : 'hover:shadow-purple-500/25'} flex-shrink-0`}
>
  <span className="relative z-10 flex items-center space-x-2">
    <span className="text-base xl:text-lg">🚀</span>
    <span className="text-sm xl:text-base text-white">¡SUSCRÍBETE YA!</span>
  </span>
  <div className={`absolute inset-0 bg-gradient-to-r ${isScrolled ? 'from-blue-700 to-purple-700' : 'from-purple-400 to-blue-400'} rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300`} />
</a>
          </div>

          {/* Tablet Navigation (lg to xl) */}
          <div className="hidden lg:flex xl:hidden items-center space-x-3">
            <a 
              href="/" 
              className={`${textColor} ${hoverTextColor} transition-colors duration-300 font-medium text-sm`}
            >
              Inicio
            </a>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdown('services');
                }}
                className={`flex items-center space-x-1 ${textColor} ${hoverTextColor} transition-colors duration-300 font-medium text-sm`}
              >
                <span>Servicios</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
                  activeDropdown === 'services' ? 'rotate-180' : ''
                }`} />
              </button>

              {activeDropdown === 'services' && (
                <div className={`absolute top-full right-0 mt-2 w-52 ${dropdownBg} backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50`}>
                  <div className="p-2">
                    {services.map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <a
                          key={service.name}
                          href={service.href}
                          className={`flex items-center space-x-2 p-2 rounded-lg ${dropdownHoverBg} transition-all duration-300 group`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <IconComponent className={`w-3 h-3 ${isScrolled ? 'text-blue-700' : 'text-purple-300'} flex-shrink-0`} />
                          <span className={`${dropdownItemTextColor} ${dropdownItemHoverTextColor} transition-colors duration-300 font-medium text-sm`}>
                            {service.name}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <a href="/nosotros" className={`${textColor} ${hoverTextColor} transition-colors duration-300 font-medium text-sm`}>
              Nosotros
            </a>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdown('activities');
                }}
                className={`flex items-center space-x-1 ${textColor} ${hoverTextColor} transition-colors duration-300 font-medium text-sm`}
              >
                <span>Actividades</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
                  activeDropdown === 'activities' ? 'rotate-180' : ''
                }`} />
              </button>

              {activeDropdown === 'activities' && (
                <div className={`absolute top-full right-0 mt-2 w-52 ${dropdownBg} backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50`}>
                  <div className="p-2">
                    {activities.map((activity) => {
                      const IconComponent = activity.icon;
                      return (
                        <a
                          key={activity.name}
                          href={activity.href}
                          className={`flex items-center space-x-2 p-2 rounded-lg ${dropdownHoverBg} transition-all duration-300 group`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <IconComponent className={`w-3 h-3 ${isScrolled ? 'text-blue-700' : 'text-purple-300'} flex-shrink-0`} />
                          <span className={`${dropdownItemTextColor} ${dropdownItemHoverTextColor} transition-colors duration-300 font-medium text-sm`}>
                            {activity.name}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <a href="https://relaticpanama.org/_blog/" className={`${textColor} ${hoverTextColor} transition-colors duration-300 font-medium text-sm`}>
              Blog
            </a>

           <a
  href="#suscribete"
  className={`relative px-4 py-2 bg-gradient-to-r ${isScrolled ? 'from-blue-700 via-purple-800 to-indigo-900' : 'from-purple-600 via-blue-600 to-indigo-700'} text-white rounded-full font-semibold hover:from-purple-500 hover:via-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg ${isScrolled ? 'hover:shadow-blue-500/25' : 'hover:shadow-purple-500/25'} flex-shrink-0`}
>
  <span className="relative z-10 flex items-center space-x-2">
    <span className="text-base">🚀</span>
    <span className="text-sm">¡SUSCRÍBETE YA!</span>
  </span>
</a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobile}
              className={`${textColor} ${hoverTextColor} transition-colors duration-300 p-2`}
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'max-h-screen opacity-100 pb-4 sm:pb-6' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className={`${dropdownBg} backdrop-blur-md rounded-xl border border-white/10 mt-4 overflow-hidden`}>
            <div className="p-3 sm:p-4 space-y-2">
              <a 
                href="/" 
                className={`block px-3 py-2 sm:px-4 sm:py-3 ${dropdownItemTextColor} ${dropdownHoverBg} rounded-lg transition-all duration-300 font-medium text-sm sm:text-base`}
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </a>

              {/* Mobile Services */}
              <div className="space-y-1 sm:space-y-2">
                <div className={`px-3 py-1 sm:px-4 sm:py-2 font-semibold text-xs sm:text-sm tracking-wider uppercase ${isScrolled ? 'text-blue-700' : 'text-purple-300'}`}>
                  Servicios
                </div>
                {services.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <a
                      key={service.name}
                      href={service.href}
                      className={`flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 ${dropdownItemTextColor} ${dropdownHoverBg} rounded-lg transition-all duration-300 text-sm sm:text-base`}
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className={`w-4 h-4 ${isScrolled ? 'text-blue-700' : 'text-purple-300'} flex-shrink-0`} />
                      <span>{service.name}</span>
                    </a>
                  );
                })}
              </div>

              <a 
                href="/nosotros" 
                className={`block px-3 py-2 sm:px-4 sm:py-3 ${dropdownItemTextColor} ${dropdownHoverBg} rounded-lg transition-all duration-300 font-medium text-sm sm:text-base`}
                onClick={() => setIsOpen(false)}
              >
                Nosotros
              </a>

              {/* Mobile Activities */}
              <div className="space-y-1 sm:space-y-2">
                <div className={`px-3 py-1 sm:px-4 sm:py-2 font-semibold text-xs sm:text-sm tracking-wider uppercase ${isScrolled ? 'text-blue-700' : 'text-purple-300'}`}>
                  Actividades
                </div>
                {activities.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <a
                      key={activity.name}
                      href={activity.href}
                      className={`flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 ${dropdownItemTextColor} ${dropdownHoverBg} rounded-lg transition-all duration-300 text-sm sm:text-base`}
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className={`w-4 h-4 ${isScrolled ? 'text-blue-700' : 'text-purple-300'} flex-shrink-0`} />
                      <span>{activity.name}</span>
                    </a>
                  );
                })}
              </div>

              <a 
                href="https://relaticpanama.org/_blog/" 
                className={`block px-3 py-2 sm:px-4 sm:py-3 ${dropdownItemTextColor} ${dropdownHoverBg} rounded-lg transition-all duration-300 font-medium text-sm sm:text-base`}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </a>

              <div className="pt-3 sm:pt-4 border-t border-white/10">
               <a
  href="/suscription"
  className={`flex items-center justify-center space-x-2 w-full px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r ${isScrolled ? 'from-blue-700 via-purple-800 to-indigo-900' : 'from-purple-600 via-blue-600 to-indigo-700'} text-white rounded-lg font-semibold hover:from-purple-500 hover:via-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base`}
  onClick={() => setIsOpen(false)}
>
  <span className="text-base">🚀</span>
  <span>¡SUSCRÍBETE YA!</span>
</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;