import { useEffect, useRef, useState } from 'react'
import './styles.css'
import BackgroundVideo from '../../components/BackgroundVideo'
import WordCarousel from '../../components/WordCarousel'
import TravelPlanForm from '../../components/TravelPlanForm'
import logo from '../../../../assets/icon512.png'

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const mainRef = useRef<HTMLDivElement>(null)

  const words = [
    'Flights',
    'Hotels',
    'Cars',
    'Experiences',
    'Adventures',
    'Memories',
    'Exploration',
    'Discovery'
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return
      const scrollPosition = mainRef.current.scrollTop
      const viewportHeight = window.innerHeight

      // Calculate scroll progress (0 to 1)
      const progress = Math.min(scrollPosition / (viewportHeight * 0.3), 1)
      setScrollProgress(progress)

      if (scrollPosition > viewportHeight * 0.3) {
        setShowForm(true)
        setHeroVisible(false)
      } else {
        setShowForm(false)
        setHeroVisible(true)
      }
    }

    const mainElement = mainRef.current
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <main ref={mainRef} className="main-container">
      <BackgroundVideo />
      <div className="content-container">
        <div className={`hero-section ${!heroVisible ? 'hidden' : ''}`}>
          <img src={logo} alt="TravelBoost" className="hero-logo" />
          <h1 className="main-title">
            Find the best deals for
            <WordCarousel words={words} />
          </h1>
          <div className="scroll-indicator" style={{ opacity: 1 - scrollProgress }}>
            {[0, 1, 2].map((index) => (
              <div key={index} className="chevron" />
            ))}
          </div>
        </div>
        {showForm && (
          <div className="form-section">
            <TravelPlanForm />
          </div>
        )}
      </div>
    </main>
  )
} 