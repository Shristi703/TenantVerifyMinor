import Hero from "../../components/Hero"
import StepsSection from "../../components/StepsSection"
import Reviews from "../../components/Reviews"

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-encora-green">
      <Hero />
      <StepsSection />
      <Reviews />
    </main>
  )
}

