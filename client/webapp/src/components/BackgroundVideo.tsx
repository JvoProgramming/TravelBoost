import landingVideo from '../../../assets/landingpage_video.mp4'

export default function BackgroundVideo() {
  return (
    <div className="video-background">
      <video autoPlay muted loop playsInline>
        <source 
          src={landingVideo}
          type="video/mp4" 
        />
      </video>
      <div className="video-overlay"></div>
    </div>
  )
} 