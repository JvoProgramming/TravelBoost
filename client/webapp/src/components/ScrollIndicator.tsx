export default function ScrollIndicator() {
  return (
    <div className="scroll-indicator">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="chevron"
        />
      ))}
    </div>
  )
} 