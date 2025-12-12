interface Props {
    title: string;
}

export const TopBar = ({ title }: Props) => {
    return (
        <div className="bg-gradient-to-r from-green-800 via-emerald-700 to-teal-600 text-white text-[11px] sm:text-xs font-bold py-2.5 text-center tracking-wide relative z-50 shadow-sm">
            <p className="animate-pulse-slow drop-shadow-sm flex items-center justify-center gap-2">
                <span className="text-lime-300">🌱</span>
                {title}
                <span className="text-lime-300">🌿</span>
            </p>
        </div>
    )
}
