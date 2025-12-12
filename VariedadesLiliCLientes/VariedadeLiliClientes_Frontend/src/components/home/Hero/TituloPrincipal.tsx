interface Props {
    tituloPrincipal: string;
    tituloSecundario: string;
    description:string;
}


export const TituloPrincipal = ({ tituloPrincipal, tituloSecundario,description}: Props) => {
    return (
        <>
            <h1 className="text-5xl lg:text-6xl/tight font-extrabold text-slate-900 dark:text-white tracking-tight">
                {tituloPrincipal} <br />
                <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    {tituloSecundario}
                </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                {description}
            </p>
        </>
    )
}
