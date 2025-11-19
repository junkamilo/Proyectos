export const Footer = () => {
  return (
    <footer className="bg-[#1c1c1c] text-gray-300 border-t-4 border-[#ff4d38] font-sans relative overflow-hidden">

      {/* Decoración de fondo (Pattern sutil) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="footer-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="text-white" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Columna 1: Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-black text-white tracking-tighter">Rappi</span>
              <span className="text-2xl text-[#ff4d38]">⚡</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Estandarización de procesos de QA y automatización para entregas de alta calidad.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#ff4d38]/10 text-[#ff4d38] text-xs font-bold border border-[#ff4d38]/20">
                QA Guidelines v1.0
              </span>
            </div>
          </div>

          {/* Columna 2: Enlaces de la Presentación */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6 border-b border-gray-800 pb-2 inline-block">
              Temas
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="hover:text-[#ff4d38] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#3bc967] rounded-full"></span>Objetivos</a></li>
              <li><a href="/redaccion" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-blue-500 rounded-full"></span>Redacción</a></li>
              <li><a href="/botones" className="hover:text-[#ffba00] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#ffba00] rounded-full"></span>Botones UI</a></li>
              <li><a href="/variables" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-teal-500 rounded-full"></span>Variables</a></li>
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6 border-b border-gray-800 pb-2 inline-block">
              Legal & Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trabaja con nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Soporte Técnico</a></li>
            </ul>
          </div>

          {/* Columna 4: Descarga (Simulada) & Social */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6 border-b border-gray-800 pb-2 inline-block">
              Disponible en
            </h3>
            <div className="flex flex-col gap-3">
              {/* App Store Badge (Simulado con CSS) */}
              <button className="flex items-center bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-xl px-4 py-2 text-left w-full max-w-[180px]">
                <svg className="w-6 h-6 text-white mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-1.09 3.77-1.02.79.03 2.95.37 3.88 1.7-.18.1-2.34 1.33-2.3 4.05.03 2.88 2.53 3.88 2.63 3.94-.03.06-.4.72-.84 1.36-.63 1.06-1.37 2.12-2.22 2.2zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.16 2.29-2.01 4.38-3.74 4.25z" /></svg>
                <div>
                  <div className="text-[10px] leading-none">Consíguelo en el</div>
                  <div className="text-sm font-bold text-white leading-tight">App Store</div>
                </div>
              </button>

              {/* Google Play Badge (Simulado con CSS) */}
              <button className="flex items-center bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-xl px-4 py-2 text-left w-full max-w-[180px]">
                <svg className="w-6 h-6 text-white mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91,3.34,2.39,3.84,2.15L13.69,12L3.84,21.85C3.34,21.6,3,21.09,3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,12.5L17.38,15.69L15.13,13.44L17.69,10.87L20.3,11.5C20.71,11.73,20.71,12.27,20.3,12.5M13.69,12L3.84,2.15L16.81,8.88L14.54,11.15L13.69,12Z" /></svg>
                <div>
                  <div className="text-[10px] leading-none">Disponible en</div>
                  <div className="text-sm font-bold text-white leading-tight">Google Play</div>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Separador */}
        <hr className="border-gray-800 mb-8" />

        {/* Footer Bottom: Copyright & Redes */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Rappi Inc. Todos los derechos reservados. Diseño adaptado para exposición.
          </p>

          {/* Redes Sociales */}
          <div className="flex space-x-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ff4d38] hover:text-white transition-all duration-300">
              <span className="sr-only">Facebook</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ff4d38] hover:text-white transition-all duration-300">
              <span className="sr-only">Instagram</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ff4d38] hover:text-white transition-all duration-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
