export const Footer = () => {
  return (
    // Footer oscuro y limpio, con borde superior de color primario Rappi
    <footer className="bg-rappi-dark text-gray-400 border-t-4 border-rappi-primary py-6 px-4 sm:px-6 lg:px-8 shadow-inner">
      <div className="max-w-7xl mx-auto text-center">
        {/* Links de Footer: Flex wrap para mobile */}
        <div className="flex flex-wrap justify-center space-x-4 sm:space-x-8 text-sm mb-3">
          {['Términos', 'Privacidad', 'Contacto', 'Trabaja con nosotros'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-rappi-secondary transition-colors duration-150 p-1 focus:outline-none focus:ring-2 focus:ring-rappi-primary rounded-md"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs mt-2">
          &copy; {new Date().getFullYear()} Rappi Clone. Diseño por Gemini.
        </p>
      </div>
    </footer>
  );
};
