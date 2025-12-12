import CategoriesSection from "../../../components/home/CategorySection"
import FeaturedProducts from "../../../components/home/FeatureProducts/Feature-products"
import Hero from "../../../components/home/Hero/Hero"

export const HomePage = () => {
    return (
        <>
            {/* Aquí va SOLO el contenido de la página de inicio */}
            <Hero />
            <FeaturedProducts />
            <CategoriesSection />
        </>
    )
}
