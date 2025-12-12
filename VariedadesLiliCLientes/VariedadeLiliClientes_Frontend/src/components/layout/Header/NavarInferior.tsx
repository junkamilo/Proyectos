import { Link } from "react-router";

interface Props {
    scrolled: boolean;
    categories: string[];
    normalizePath: (text: string) => string;
}

export const NavarInferior = ({ scrolled, categories, normalizePath }: Props) => {
    return (
        <nav className={`hidden md:flex items-center justify-center gap-10 transition-all duration-300 ${scrolled ? 'h-0 opacity-0 overflow-hidden mt-0' : 'h-10 opacity-100 mt-2'}`}>
            {categories.map((category) => {
                const path = normalizePath(category);
                return (
                    <Link
                        key={category}
                        to={`/${path}`}
                        className="relative text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors py-1 group"
                    >
                        {category}
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                )
            })}
        </nav>
    )
}
