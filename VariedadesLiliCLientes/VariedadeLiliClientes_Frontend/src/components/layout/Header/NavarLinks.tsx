import { useHeader } from "@/components/hooks/useHeader";
import { Leaf } from "lucide-react";
import { Link } from "react-router";

export const NavarLinks = () => {

    const { categories,normalizePath , closeMenu , mobileMenuOpen} = useHeader();

    return (
        <nav className="flex flex-col gap-2">
            {categories.map((category, index) => {
                const path = normalizePath(category);
                return (
                    <Link
                        key={category}
                        to={`/${path}`}
                        onClick={closeMenu}
                        style={{ transitionDelay: `${index * 50}ms` }}
                        className={`text-xl font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 py-4 flex justify-between items-center group ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-500`}
                    >
                        {category}
                        <span className="text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                            <Leaf className="w-5 h-5 fill-emerald-100" />
                        </span>
                    </Link>
                )
            })}
        </nav>
    )
}
