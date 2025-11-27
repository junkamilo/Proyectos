import { useState } from "react"

interface GenreCardProps {
  genre: {
    id: number
    name: string
    color: string
    icon: string
  }
}

export default function GenreCard({ genre }: GenreCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`bg-gradient-to-br ${genre.color} rounded-lg p-6 cursor-pointer transition transform ${
        isHovered ? "scale-105" : "scale-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-3xl mb-3">{genre.icon}</div>
      <p className="font-bold text-white text-lg">{genre.name}</p>
    </div>
  )
}