import { useState } from "react"


interface ArtistCardProps {
  artist: {
    id: number
    name: string
    image: string
  }
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
          src={artist.image || "/placeholder.svg"}
          alt={artist.name}
          className={`w-full aspect-square object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300">
            <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition">
              ▶
            </button>
          </div>
        )}
      </div>
      <p className="font-semibold text-foreground text-sm text-center group-hover:text-primary transition">
        {artist.name}
      </p>
    </div>
  )
}
