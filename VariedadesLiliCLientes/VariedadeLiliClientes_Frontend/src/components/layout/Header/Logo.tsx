import { Leaf } from "lucide-react"
import { Link } from "react-router"

interface Props {
    title: string;
}

export const Logo = ({ title }: Props) => {
    return (
        <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/50 group-hover:scale-105 transition-all duration-300">
                <Leaf className="text-white w-6 h-6 fill-white/20" />
            </div>
            <span className="hidden sm:block text-2xl font-extrabold tracking-tight bg-gradient-to-r from-green-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent">
                {title}
            </span>
        </Link>
    )
}
