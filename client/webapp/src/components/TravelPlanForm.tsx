import { useState, useEffect } from 'react'
import LoadingDots from './LoadingDots'
import '../index.css';  // Import your CSS file

const API_URL = 'http://localhost:3000/ask' // Update this to point to your Express backend

export default function TravelPlanForm() {
  const [tripDescription, setTripDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [messages, setMessages] = useState([]) // Store chat messages (user and bot)
  const [error, setError] = useState(null) // To display any error from the backend

  const handleSubmit = async (event) => {
    event.preventDefault() // Prevent form submission if wrapped in a <form>

    if (!tripDescription.trim()) return

    setIsSubmitting(true)
    setError(null) // Clear any previous errors

    // Add user's message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: tripDescription },
    ])

    try {
      // Send trip description to the backend (Express API)
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: tripDescription,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit trip plan')
      }

      const data = await response.json()

      // Log and add the bot's response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: data.answer },
      ])

      // Clear input field
      setTripDescription('')
    } catch (error) {
      console.error('Error submitting trip plan:', error)
      setError(error.message) // Set the error message to be displayed in the UI
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="chat-container">
      <h2>Chat with us about your dream trip!</h2>

      {/* Display error message if any */}
      {error && <div className="error-message">{error}</div>}

      {/* Chat bubbles display */}
      <div className="chat-bubbles">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-bubble ${message.sender === 'user' ? 'user' : 'bot'}`}
          >
            <p>{message.text}</p>
          </div>
        ))}
        {isSubmitting && (
          <div className="chat-bubble bot">
            <LoadingDots />
          </div>
        )}
      </div>

      {/* Input and submit form */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={tripDescription}
          onChange={(e) => setTripDescription(e.target.value)}
          placeholder="Tell us about your dream trip..."
          rows={5}
        />
        <button
          className="submit-button"
          type="submit"
          disabled={isSubmitting || !tripDescription.trim()}
        >
          {isSubmitting ? <LoadingDots /> : 'Send'}
        </button>
      </form>
    </div>
  )
}
