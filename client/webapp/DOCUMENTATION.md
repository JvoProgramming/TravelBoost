# TravelBoost Web Application Documentation

## Overview
TravelBoost's web application serves as a landing page and travel planning interface. The design focuses on modern aesthetics with smooth animations and a responsive layout. The application is built to complement our Chrome extension, providing a seamless travel planning experience.

## Project Structure 
client/webapp/
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── BackgroundVideo.tsx
│ │ ├── WordCarousel.tsx
│ │ ├── TravelPlanForm.tsx
│ │ └── LoadingDots.tsx
│ ├── pages/ # Page components
│ │ └── Landing/ # Landing page with styles
│ │ ├── index.tsx
│ │ └── styles.css
│ ├── assets/ # Static assets
│ │ ├── landingpage_video.mp4
│ │ └── icon512.png
│ ├── App.tsx # Root component
│ └── App.css # Global styles


## Design System

### Colors
- Primary Blue: `rgb(135 188 244)`
- Hover Blue: `rgb(100, 166, 236)`
- Text: White for light text, Black for input text
- Overlays: Semi-transparent white/black for glass effects

### Typography
- Font Family: 'Inter' with system fallbacks
- Responsive sizing using clamp()
- Main Title: 2rem - 4rem (responsive)
- Carousel Words: 3rem - 5rem (responsive)
- Form Text: 1rem - 2rem

### Animations
1. Fade Effects
   - Components fade in on load
   - Smooth transitions between sections
   - Duration: 0.5s - 1s ease-out

2. Logo Glow
   - Continuous pulse effect
   - Color matches theme blue
   - Uses drop-shadow filter


3. Scroll Indicator
   - Three chevrons with staggered animation
   - Fades out based on scroll position
   - Smooth bounce effect

## Components

### BackgroundVideo
- Full-screen video background
- Overlay with 60% opacity black
- Object-fit: cover for proper scaling
- z-index: -1 to stay behind content

### WordCarousel
- Rotating words with flip animation
- 2-second interval between words
- Perspective transform for 3D effect
- Matches theme blue color

### TravelPlanForm
- Glass morphism effect (backdrop-filter: blur)
- Responsive width (max 800px)
- Hover effects on button
- Textarea with custom styling
- Mobile-optimized layout

### LoadingDots
- Loading dots with staggered animation
- 1.2s interval between dots
- Uses relative positioning for accurate centering

## Page Sections

### Hero Section
- Full viewport height
- Centered content
- Fade animations on scroll
- Responsive text sizing

### Form Section
- Appears on scroll
- Glass morphism design
- Smooth entrance animation
- Mobile-responsive padding and sizing

## Scroll Behavior
- Custom scroll handling
- Smooth transitions
- Progress-based animations


## Mobile Responsiveness
- Breakpoint at 768px
- Adjusted font sizes
- Modified padding and spacing
- Smaller logo and form


## Performance Considerations
1. Video background loads asynchronously
2. Smooth animations use GPU acceleration
3. Debounced scroll handling
4. Optimized asset loading

## Future Improvements
1. Add loading states
2. Implement form submission
3. Add more interactive elements
4. Enhance mobile experience
5. Add error handling
6. Implement analytics

## Development Notes
- Built with Vite + React + TypeScript
- Uses CSS modules for styling
- Follows modern React patterns
- Emphasizes clean, maintainable code