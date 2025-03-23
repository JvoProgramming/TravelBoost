# TravelBoost Chrome Extension

A Chrome extension that helps users find better travel deals by monitoring travel websites and comparing prices.

## Installation for Development

### Prerequisites
- Google Chrome browser
- Node.js (for development)

### Loading the Extension
1. Clone the repository
```bash
git clone https://github.com/your-org/travelboost.git
cd client/extension
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the `client/extension` directory

The extension should now appear in your Chrome toolbar.

### Development
1. Make changes to the files in the `extension` directory
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. The extension will reload with your changes

### Testing
Test the extension on supported travel sites:
- Flights:
  - kayak.com/flights
  - expedia.com/flights
  - google.com/flights
- Hotels:
  - booking.com
  - hotels.com
  - expedia.com/hotels
- Car Rentals:
  - enterprise.com
  - hertz.com
  - expedia.com/car-rentals

## Project Structure
```
extension/
├── icons/              # Extension icons
├── scripts/
│   ├── content.js      # Content script
│   └── popup.js        # Popup UI logic
├── styles/
│   └── popup.css       # Popup styles
├── manifest.json       # Extension config
└── popup.html          # Popup UI template
```

## Features
- Real-time price monitoring
- Deal comparison
- Support for multiple travel categories
- Clean, modern UI
- Device-aware functionality

## Development Notes
- Uses Manifest V3
- No build step required
- Monitor console logs for debugging
- Test thoroughly on supported sites 