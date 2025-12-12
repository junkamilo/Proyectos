export const useFeaturedProducts = () => {
    // Simulamos que esto viene de una API o Base de Datos
    const products = [
        {
            id: 1,
            name: "Planta Monstera Deliciosa",
            price: 45900,
            image: "https://images.unsplash.com/photo-1614594975525-e45852b82481?auto=format&fit=crop&q=80&w=800",
            category: "Plantas",
            rating: 4.9,
            isNew: true,
        },
        {
            id: 2,
            name: "Maceta Cerámica Nórdica",
            price: 24900,
            image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800",
            category: "Materos",
            rating: 4.6,
        },
        {
            id: 3,
            name: "Abono Orgánico Premium 2kg",
            price: 18900,
            image: "https://images.unsplash.com/photo-1628676343105-d3cb0bb89a07?auto=format&fit=crop&q=80&w=800",
            category: "Abono",
            rating: 4.9,
        },
        {
            id: 4,
            name: "Pot Decorativo Gold Edition",
            price: 32500,
            image: "https://images.unsplash.com/photo-1589733955941-513b6f2d955a?auto=format&fit=crop&q=80&w=800",
            category: "Alcancías",
            rating: 4.7,
            isNew: true,
        },
        {
            id: 5,
            name: "Pothos Colgante Neon",
            price: 28900,
            image: "https://images.unsplash.com/photo-1596724808375-72ee331c4b22?auto=format&fit=crop&q=80&w=800",
            category: "Plantas",
            rating: 4.8,
        },
        {
            id: 7,
            name: "Orquídea Phalaenopsis",
            price: 52900,
            image: "https://images.unsplash.com/photo-1566904609353-73db236c9343?auto=format&fit=crop&q=80&w=800",
            category: "Plantas",
            rating: 5.0,
            isNew: true,
        },
    ]

    return {
        products
    }
}