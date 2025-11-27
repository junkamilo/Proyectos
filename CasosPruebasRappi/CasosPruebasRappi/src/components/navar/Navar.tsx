import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";


export const Navar = () => {
  const { query } = useSearch();

  // 🟢 Tus items EXACTOS convertidos a un array para poder filtrarlos
  const items = [
    {
      title: "Objetivo-Estandarizacion",
      path: "/",
      icon: (
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3bc967] to-[#6feba5] flex items-center justify-center text-white shadow-md shadow-green-500/20 group-hover:scale-110 transition-transform duration-300 ease-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      color: "text-[#3bc967]",
    },

    {
      title: "1) Redaccion",
      path: "/redaccion",
      icon: (
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300 ease-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
      ),
      color: "text-blue-500",
    },

    {
      title: "2) Botones entre corchetes [ ]",
      path: "/botones",
      icon: (
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ffba00] to-[#ffd560] flex items-center justify-center text-white shadow-md shadow-yellow-500/20 group-hover:scale-110 transition-transform duration-300 ease-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        </div>
      ),
      color: "text-[#ffba00]",
    },

    {
      title: "3) Textos fijos entre comillas “ ”",
      path: "/texto",
      icon: (
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300 ease-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
      ),
      color: "text-purple-600",
    },

    {
      title: "4) Variables entre...",
      path: "/variables",
      icon: (
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-300 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-110 transition-transform duration-300 ease-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
      ),
      color: "text-teal-500",
    },

    {
      title: "5) Todo objetivo debe iniciar con...",
      path: "/nombresCasosPrubas",
      icon: (
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-pink-300 flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-110 transition-transform duration-300 ease-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      color: "text-pink-500",
    },

    {
      title: "6) Titulos con estructura estandarizada",
      path: "/titulos",
      icon: (
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-600 to-gray-400 flex items-center justify-center text-white shadow-md shadow-gray-500/20 group-hover:scale-110 transition-transform duration-300 ease-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
      ),
      color: "text-gray-600",
    },
  ];

  // 🟢 FILTRO (super simple y poderoso)
  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <nav className="w-full bg-white border-b border-gray-100 relative z-10">
      <div className="max-w-[1920px] mx-auto overflow-x-auto scrollbar-hide py-4">
        <ul className="flex items-start gap-6 px-4 md:justify-center min-w-max">

          {filtered.map((item, index) => (
            <li key={index} className="group flex flex-col items-center cursor-pointer w-36 sm:w-40 shrink-0">
              <Link to={item.path} className="flex flex-col items-center w-full">
                {item.icon}

                <span className={`mt-3 text-[11px] font-bold text-gray-500 text-center leading-tight group-hover:${item.color} transition-colors duration-200 w-full px-1`}>
                  {item.title}
                </span>
              </Link>
            </li>
          ))}

        </ul>
      </div>
    </nav>
  );
};
