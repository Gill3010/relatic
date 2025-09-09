import { 
  useState, 
  useEffect 
} from 'react';
import { 
  Menu, 
  X, 
  ChevronDown,
  Newspaper,
  UserPlus,
  Rocket // Nuevo ícono para el botón "¡AFÍLIATE YA!"
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
    { name: 'Libros Digitales', href: 'https://relaticpanama.org/_books/index.php/edrp/catalog', icon: BookOpen },
    { name: 'Aprendizaje Continuo', href: 'https://relaticpanama.org/_classroom/', icon: GraduationCap },
    { name: 'Propiedad Intelectual', href: 'https://relaticpanama.org/_protect/', icon: ShieldCheck }
  ];

  const activities = [
    { name: 'Próximas Actividades', href: '/actividades/proximas', icon: CalendarCheck },
    { name: 'Actividades Anteriores', href: '/actividades/anteriores', icon: History }
  ];

  const textColor = isScrolled ? 'text-slate-700' : 'text-white';
  const hoverTextColor = isScrolled ? 'hover:text-blue-600' : 'hover:text-blue-200';
  const dropdownBg = isScrolled ? 'bg-white' : 'bg-slate-800';
  const dropdownHoverBg = isScrolled ? 'hover:bg-slate-50' : 'hover:bg-slate-700';
  const dropdownItemTextColor = isScrolled ? 'text-slate-700' : 'text-white';
  const dropdownItemHoverTextColor = isScrolled ? 'group-hover:text-blue-600' : 'group-hover:text-blue-200';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm border-b border-slate-200'
        : 'bg-transparent'
    }`}>
      {/* Elementos decorativos geométricos simplificados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-2 left-4 sm:left-10 w-6 h-6 sm:w-8 sm:h-8 border border-slate-300/30 transform rotate-45 transition-opacity duration-500 ${isScrolled ? 'opacity-20' : 'opacity-40'}`} />
        <div className={`absolute top-4 right-8 sm:right-20 w-4 h-4 sm:w-6 sm:h-6 border border-slate-300/30 rounded-full transition-opacity duration-500 ${isScrolled ? 'opacity-20' : 'opacity-40'}`} />
        <div className={`absolute bottom-2 right-4 sm:right-10 w-3 h-3 sm:w-4 sm:h-4 bg-slate-300/20 transform rotate-12 transition-opacity duration-500 ${isScrolled ? 'opacity-20' : 'opacity-40'}`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo con diseño institucional limpio */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-shrink">
            <a href="/" className="min-w-0 block flex items-center space-x-2 sm:space-x-3">
              <div className="relative flex-shrink-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${
                  isScrolled 
                    ? 'bg-blue-600' 
                    : 'bg-slate-700'
                } rounded-lg flex items-center justify-center transition-colors duration-500`}>
                  <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className={`absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 ${
                  isScrolled ? 'bg-orange-400' : 'bg-blue-300'
                } rounded-full transition-colors duration-500`} />
              </div>
              <div>
                <h1 className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-500 ${textColor}`}>
                  RELATIC PANAMÁ
                </h1>
                <span className={`text-xs sm:text-xs lg:text-xs tracking-wider leading-tight block transition-colors duration-500 ${
                  isScrolled ? 'text-slate-500' : 'text-slate-300'
                }`}>
                  Red Latinoamericana de Investigaciones Cualitativas
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation - Diseño limpio y profesional */}
          <div className="hidden xl:flex items-center space-x-4 2xl:space-x-6">
            <a 
              href="/" 
              className={`${textColor} ${hoverTextColor} transition-all duration-300 font-medium relative group text-sm 2xl:text-base`}
            >
              Inicio
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`} />
            </a>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdown('services');
                }}
                className={`flex items-center space-x-1 ${textColor} ${hoverTextColor} transition-all duration-300 font-medium relative group text-sm 2xl:text-base`}
              >
                <span>Servicios</span>
                <ChevronDown className={`w-3 h-3 2xl:w-4 2xl:h-4 transition-transform duration-300 ${
                  activeDropdown === 'services' ? 'rotate-180' : ''
                }`} />
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`} />
              </button>

              {/* Services Dropdown Menu */}
              {activeDropdown === 'services' && (
                <div className={`absolute top-full left-0 mt-2 w-56 xl:w-64 ${dropdownBg} border border-slate-200 rounded-lg overflow-hidden z-50 shadow-lg`}>
                  <div className="p-2">
                    {services.map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <a
                          key={service.name}
                          href={service.href}
                          className={`flex items-center space-x-3 p-2 xl:p-3 rounded-md ${dropdownHoverBg} transition-all duration-300 group`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className={`w-7 h-7 xl:w-8 xl:h-8 ${
                            isScrolled ? 'bg-blue-50' : 'bg-slate-700'
                          } rounded-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
                            <IconComponent className={`w-3 h-3 xl:w-4 xl:h-4 ${
                              isScrolled ? 'text-blue-600' : 'text-blue-200'
                            }`} />
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
              className={`${textColor} ${hoverTextColor} transition-all duration-300 font-medium relative group text-sm 2xl:text-base`}
            >
              Nosotros
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`} />
            </a>

            {/* Activities Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdown('activities');
                }}
                className={`flex items-center space-x-1 ${textColor} ${hoverTextColor} transition-all duration-300 font-medium relative group text-sm 2xl:text-base`}
              >
                <span>Actividades</span>
                <ChevronDown className={`w-3 h-3 2xl:w-4 2xl:h-4 transition-transform duration-300 ${
                  activeDropdown === 'activities' ? 'rotate-180' : ''
                }`} />
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`} />
              </button>

              {/* Activities Dropdown Menu */}
              {activeDropdown === 'activities' && (
                <div className={`absolute top-full left-0 mt-2 w-56 xl:w-64 ${dropdownBg} border border-slate-200 rounded-lg overflow-hidden z-50 shadow-lg`}>
                  <div className="p-2">
                    {activities.map((activity) => {
                      const IconComponent = activity.icon;
                      return (
                        <a
                          key={activity.name}
                          href={activity.href}
                          className={`flex items-center space-x-3 p-2 xl:p-3 rounded-md ${dropdownHoverBg} transition-all duration-300 group`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className={`w-7 h-7 xl:w-8 xl:h-8 ${
                            isScrolled ? 'bg-blue-50' : 'bg-slate-700'
                          } rounded-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
                            <IconComponent className={`w-3 h-3 xl:w-4 xl:h-4 ${
                              isScrolled ? 'text-blue-600' : 'text-blue-200'
                            }`} />
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
              className={`${textColor} ${hoverTextColor} transition-all duration-300 font-medium relative group text-sm 2xl:text-base`}
            >
              Blog
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`} />
            </a>

            {/* Botón de Afiliación con efecto de borde y color azul claro */}
            <a
              href="/suscription"
              className={`relative px-3 py-1.5 xl:px-4 xl:py-2 border-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex-shrink-0 ${
                isScrolled 
                  ? 'border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white' 
                  : 'border-sky-400 text-sky-300 hover:bg-sky-400 hover:text-slate-800'
              }`}
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                <Rocket className="w-3 h-3 xl:w-4 xl:h-4" />
                <span className="text-sm xl:text-base">¡AFÍLIATE YA!</span>
              </span>
            </a>

            {/* Botón de Registro */}
            <a
              href="/registro-usuario"
              className={`relative px-3 py-1.5 xl:px-4 xl:py-2 border-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex-shrink-0 ${
                isScrolled 
                  ? 'border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white' 
                  : 'border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-slate-800'
              }`}
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                <UserPlus className="w-3 h-3 xl:w-4 xl:h-4" />
                <span className="text-sm xl:text-base">Registrarse</span>
              </span>
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
                <div className={`absolute top-full right-0 mt-2 w-52 ${dropdownBg} border border-slate-200 rounded-lg overflow-hidden z-50 shadow-lg`}>
                  <div className="p-2">
                    {services.map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <a
                          key={service.name}
                          href={service.href}
                          className={`flex items-center space-x-2 p-2 rounded-md ${dropdownHoverBg} transition-all duration-300 group`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <IconComponent className={`w-3 h-3 ${
                            isScrolled ? 'text-blue-600' : 'text-blue-200'
                          } flex-shrink-0`} />
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
                <div className={`absolute top-full right-0 mt-2 w-52 ${dropdownBg} border border-slate-200 rounded-lg overflow-hidden z-50 shadow-lg`}>
                  <div className="p-2">
                    {activities.map((activity) => {
                      const IconComponent = activity.icon;
                      return (
                        <a
                          key={activity.name}
                          href={activity.href}
                          className={`flex items-center space-x-2 p-2 rounded-md ${dropdownHoverBg} transition-all duration-300 group`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <IconComponent className={`w-3 h-3 ${
                            isScrolled ? 'text-blue-600' : 'text-blue-200'
                          } flex-shrink-0`} />
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

            {/* Botón de Afiliación para Tablet */}
            <a
              href="/suscription"
              className={`relative px-3 py-1.5 border-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex-shrink-0 ${
                isScrolled 
                  ? 'border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white' 
                  : 'border-sky-400 text-sky-300 hover:bg-sky-400 hover:text-slate-800'
              }`}
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                <Rocket className="w-3 h-3" />
                <span className="text-sm">¡AFÍLIATE YA!</span>
              </span>
            </a>

            {/* Botón de Registro para Tablet */}
            <a
              href="/registro-usuario"
              className={`relative px-3 py-1.5 border-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex-shrink-0 ${
                isScrolled 
                  ? 'border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white' 
                  : 'border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-slate-800'
              }`}
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                <UserPlus className="w-3 h-3" />
                <span className="text-sm">Registrarse</span>
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
          <div className={`${dropdownBg} border border-slate-200 rounded-lg mt-4 overflow-hidden shadow-lg`}>
            <div className="p-3 sm:p-4 space-y-2">
              <a 
                href="/" 
                className={`block px-3 py-2 sm:px-4 sm:py-3 ${dropdownItemTextColor} ${dropdownHoverBg} rounded-md transition-all duration-300 font-medium text-sm sm:text-base`}
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </a>

              {/* Mobile Services */}
              <div className="space-y-1 sm:space-y-2">
                <div className={`px-3 py-1 sm:px-4 sm:py-2 font-semibold text-xs sm:text-sm tracking-wider uppercase ${
                  isScrolled ? 'text-blue-600' : 'text-blue-200'
                }`}>
                  Servicios
                </div>
                {services.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <a
                      key={service.name}
                      href={service.href}
                      className={`flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 ${dropdownItemTextColor} ${dropdownHoverBg} rounded-md transition-all duration-300 text-sm sm:text-base`}
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className={`w-4 h-4 ${
                        isScrolled ? 'text-blue-600' : 'text-blue-200'
                      } flex-shrink-0`} />
                      <span>{service.name}</span>
                    </a>
                  );
                })}
              </div>

              <a 
                href="/nosotros" 
                className={`block px-3 py-2 sm:px-4 sm:py-3 ${dropdownItemTextColor} ${dropdownHoverBg} rounded-md transition-all duration-300 font-medium text-sm sm:text-base`}
                onClick={() => setIsOpen(false)}
              >
                Nosotros
              </a>

              {/* Mobile Activities */}
              <div className="space-y-1 sm:space-y-2">
                <div className={`px-3 py-1 sm:px-4 sm:py-2 font-semibold text-xs sm:text-sm tracking-wider uppercase ${
                  isScrolled ? 'text-blue-600' : 'text-blue-200'
                }`}>
                  Actividades
                </div>
                {activities.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <a
                      key={activity.name}
                      href={activity.href}
                      className={`flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 ${dropdownItemTextColor} ${dropdownHoverBg} rounded-md transition-all duration-300 text-sm sm:text-base`}
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className={`w-4 h-4 ${
                        isScrolled ? 'text-blue-600' : 'text-blue-200'
                      } flex-shrink-0`} />
                      <span>{activity.name}</span>
                    </a>
                  );
                })}
              </div>

              <a 
                href="https://relaticpanama.org/_blog/" 
                className={`block px-3 py-2 sm:px-4 sm:py-3 ${dropdownItemTextColor} ${dropdownHoverBg} rounded-md transition-all duration-300 font-medium text-sm sm:text-base`}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </a>

              {/* Botón de Afiliación Móvil */}
              <a
                href="/suscription"
                className={`flex items-center justify-center space-x-2 w-full px-4 py-2 sm:px-6 sm:py-3 border-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                  isScrolled 
                    ? 'border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white' 
                    : 'border-sky-400 text-sky-300 hover:bg-sky-400 hover:text-slate-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Rocket className="w-4 h-4" />
                <span>¡AFÍLIATE YA!</span>
              </a>

              {/* Botón de Registro Móvil */}
              <a
                href="/registro-usuario"
                className={`flex items-center justify-center space-x-2 w-full px-4 py-2 sm:px-6 sm:py-3 border-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                  isScrolled 
                    ? 'border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white' 
                    : 'border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-slate-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <UserPlus className="w-4 h-4" />
                <span>Registrarse</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;