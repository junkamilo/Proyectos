import { useState } from "react";
import type { ArtistaDestacado } from "../types/artistas.interfaces";



interface ArtistCardProps {
    artist: ArtistaDestacado; // Usamos el tipo real
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <img
          // Usamos la propiedad .image que calculaste en tu función
          src={artist.image || "/placeholder.svg"} 
          alt={artist.nombre_artista}
          className={`w-full aspect-square object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          // Añadí esto por seguridad si la imagen falla
          onError={(e) => { e.currentTarget.src = "/placeholder.svg" }}
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300">
            <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition">
              ▶
            </button>
          </div>
        )}
      </div>
      
      {/* Nombre del Artista */}
      <p className="font-semibold text-foreground text-sm text-center group-hover:text-primary transition">
        {artist.nombre_artista}
      </p>

      {/* Opcional: Mostrar el género debajo */}
      <p className="text-xs text-gray-500 text-center">
        {artist.nombre_genero}
      </p>
    </div>
  )
}
