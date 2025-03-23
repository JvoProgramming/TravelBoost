import { useEffect, useState } from 'react'

interface WordCarouselProps {
  words: string[]
}

export default function WordCarousel({ words }: WordCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsFlipping(false)
      }, 500)
    }, 2000)

    return () => clearInterval(interval)
  }, [words.length])

  return (
    <div className="word-carousel">
      <span className={`carousel-word ${isFlipping ? 'flip-out' : ''}`}>
        {words[currentIndex]}
      </span>
    </div>
  )
} 