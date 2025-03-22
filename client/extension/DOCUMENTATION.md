# TravelBoost Chrome Extension Documentation

## Overview
TravelBoost is a Chrome extension that helps users find better travel deals by monitoring travel websites and comparing prices. The extension runs on supported travel sites and communicates with a backend service to analyze and find better deals.

## Architecture

### 1. Extension Structure
```
client/
├── extension/               # Chrome extension files
│   ├── icons/              # Extension icons
│   ├── scripts/
│   │   ├── content.js      # Content script that runs on travel sites
│   │   └── popup.js        # Controls the extension popup UI
│   ├── styles/
│   │   └── popup.css       # Styles for the popup UI
│   ├── manifest.json       # Extension configuration
│   └── popup.html          # Popup UI template
└── webapp/                 # Web application (React + TypeScript)
```

### 2. Key Components

#### Content Script (content.js)
- Runs on supported travel websites
- Monitors URL changes using MutationObserver
- Sends page data to backend for analysis
- Communicates with popup using chrome.runtime.sendMessage

```javascript
// Example of data sent to backend
{
  url: "https://kayak.com/flights/...",
  timestamp: "2024-03-14T12:00:00Z",
  title: "Flight Search Results",
  hostname: "kayak.com"
}
```

#### Popup UI (popup.js)
- Displays current scanning status
- Shows deals returned from backend
- Supports different types of deals:
  - Flights
  - Hotels
  - Car Rentals

#### Message Types
```javascript
// SCANNING_STARTED
{ type: 'SCANNING_STARTED' }

// DEALS_FOUND
{
  type: 'DEALS_FOUND',
  category: 'flight' | 'hotel' | 'car',
  deals: Deal[]
}
```

### 3. Deal Templates

#### Flight Deals
```javascript
{
  airline: string,
  description: string,
  price: string,
  originalPrice: string,
  departureDate: string,
  returnDate: string,
  url: string
}
```

#### Hotel Deals
```javascript
{
  hotelName: string,
  location: string,
  pricePerNight: string,
  originalPrice: string,
  checkIn: string,
  checkOut: string,
  url: string
}
```

#### Car Rental Deals
```javascript
{
  company: string,
  carType: string,
  location: string,
  pricePerDay: string,
  originalPrice: string,
  pickUp: string,
  dropOff: string,
  url: string
}
```

### 4. Supported Travel Sites
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

### 5. Backend Integration
The extension communicates with a backend service at `https://api.travelboost.com/v1/scan` which:
- Receives page data from the content script
- Analyzes prices and finds better deals
- Returns deals in the correct format for the popup UI
- Determines the category of deals based on the URL

### 6. UI States

#### Loading State
- Shows pulsing animation
- Displays "Scanning for better deals..." message
- Triggered when content script starts scanning

#### Initial State
- Shows welcome message
- Guides users to start searching on travel sites
- Message: "Start planning your trip! Search for flights, hotels, or cars and we'll find you the best deals."

#### Deals Found State
- Shows number of deals found
- Displays deal cards with:
  - Price comparison
  - Savings amount
  - Relevant dates
  - Direct booking links

### 7. Error Handling
- Network errors are caught and logged
- UI shows appropriate error states
- Failed requests don't break the extension
- Automatic retries are not implemented (yet)

### 8. Future Improvements
1. Add support for more travel sites
2. Implement price history tracking
3. Add user preferences for deal notifications
4. Support multiple currencies
5. Add offline mode for saved deals
6. Implement deal sharing functionality

### 9. Development Notes
- Use `chrome://extensions/` with Developer Mode for testing
- Load unpacked extension from the `extension` directory
- Monitor console logs for debugging
- Test on supported travel sites to verify functionality 