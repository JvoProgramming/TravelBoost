# TravelBoost

TravelBoost is a comprehensive travel planning platform that combines a Chrome extension and web application to help users find the best travel deals and plan their trips efficiently.

![TravelBoost Logo](/client/assets/icon512.png)

## Overview

The platform consists of two main components:

### 1. Chrome Extension
- Monitors travel websites in real-time
- Compares prices across multiple platforms
- Supports flights, hotels, and car rentals
- Provides instant notifications for better deals
- Works with major travel sites like Kayak, Expedia, and Booking.com

### 2. Web Application
- Modern landing page with trip planning interface
- AI-powered trip suggestion system
- Responsive design for all devices
- Seamless integration with the Chrome extension
- Clean, intuitive user interface

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Google Chrome browser
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-org/travelboost.git
cd travelboost
```

2. Set up the Web Application
```bash
cd client/webapp
npm install
npm run dev
```
The web app will be available at `http://localhost:5173`

3. Install the Chrome Extension
```bash
cd ../extension
```
- Open Chrome and go to `chrome://extensions/`
- Enable "Developer mode"
- Click "Load unpacked" and select the `extension` directory

## Project Structure
```
travelboost/
├── client/
│   ├── webapp/         # React web application
│   └── extension/      # Chrome extension
└── server/            # Backend services
```

## Features

### Chrome Extension
- Real-time price monitoring
- Multi-platform deal comparison
- Support for:
  - Flights
  - Hotels
  - Car rentals
- Clean, modern UI
- Instant notifications

### Web Application
- Modern, responsive design
- AI-powered trip planning
- Device-aware functionality
- Smooth animations
- Form validation
- API integration

## Development

### Web Application
```bash
cd client/webapp
npm install
npm run dev
```

### Chrome Extension
1. Navigate to `chrome://extensions/`
2. Enable Developer mode
3. Load unpacked extension from `client/extension`
4. Refresh to see changes

## Contributing
We welcome contributions! Please open a PR and we will review it.

## Documentation
- [Web Application Documentation](client/webapp/DOCUMENTATION.md)
- [Chrome Extension Documentation](client/extension/DOCUMENTATION.md)

## Support
For support, please open an issue or contact us at jvoprogramming@gmail.com or rohansuri17@gmail.com

## Authors
- Johnny Vo
- Rohan Suri

## Acknowledgments
- All the contributors who have helped with code, bug reports, and suggestions
- The open-source community for the amazing tools and libraries