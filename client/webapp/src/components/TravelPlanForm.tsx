import { useState, useEffect } from 'react'
import LoadingDots from './LoadingDots'

const API_URL = 'https://api.travelboost.com/v1/trips'

export default function TravelPlanForm() {
  const [tripDescription, setTripDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState({
    type: 'unknown',
    screenWidth: 0,
    screenHeight: 0,
    userAgent: ''
  })

  useEffect(() => {
    const getDeviceInfo = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      setDeviceInfo({
        type: isMobile ? 'mobile' : 'desktop',
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        userAgent: navigator.userAgent
      })
    }

    getDeviceInfo()
    window.addEventListener('resize', getDeviceInfo)
    return () => window.removeEventListener('resize', getDeviceInfo)
  }, [])

  const handleSubmit = async () => {
    if (!tripDescription.trim()) return

    setIsSubmitting(true)
    try {
      // mock api call, replace with actual api call when built
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: tripDescription,
          timestamp: new Date().toISOString(),
          source: 'web',
          device: deviceInfo
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit trip plan')
      }

      // Clear form and show success
      setTripDescription('')
    } catch (error) {
      console.error('Error submitting trip plan:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="travel-plan-form">
      <h2>Describe your dream trip</h2>
      <textarea 
        value={tripDescription}
        onChange={(e) => setTripDescription(e.target.value)}
        placeholder="Tell us about your dream trip... Example: I want to visit Japan for 2 weeks in April, need flights from NYC and hotels in Tokyo and Kyoto."
        rows={5}
      />
      <button 
        className="submit-button"
        onClick={handleSubmit}
        disabled={isSubmitting || !tripDescription.trim()}
      >
        {isSubmitting ? <LoadingDots /> : '🚀🚀🚀'}
      </button>
    </div>
  )
} 