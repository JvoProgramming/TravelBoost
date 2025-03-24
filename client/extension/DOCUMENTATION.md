# TravelBoost Chrome Extension Documentation

## Overview
TravelBoost is a Chrome extension that helps users find better travel deals by monitoring travel websites and comparing prices. The extension scans for deals when users visit supported travel sites and shows notifications for better deals.

## Architecture

### 1. Extension Structure
```
client/
├── extension/               # Chrome extension files
│   ├── icons/              # Extension icons
│   ├── scripts/
│   │   ├── content.js      # Content script that runs on travel sites
│   │   ├── popup.js        # Controls the extension popup UI
│   │   └── background.js   # Background script for extension actions
│   ├── styles/
│   │   └── popup.css       # Styles for the popup UI
│   ├── manifest.json       # Extension configuration
│   └── popup.html          # Popup UI template
```

### 2. Key Components

#### Content Script (content.js)
- Monitors URL changes using MutationObserver
- Sends page data to backend for analysis
- Shows notification badge when deals are found
- Manages notification state to prevent duplicates
- Handles manual scan requests from popup

#### Popup UI (popup.js)
- Displays current scanning status
- Shows deals returned from backend
- Checks for fresh deals in storage (< 5 minutes old)
- Only triggers new scans when needed
- Supports different deal templates:
  - Hotels
  - Flights
  - Car Rentals

#### Background Script (background.js)
- Handles extension popup actions
- Manages extension icon clicks
- Processes messages from content script

### 3. Deal Notification System
- Shows notification badge on webpage when deals found
- Displays maximum savings amount
- Auto-dismisses after 10 seconds
- Click to view details in extension popup
- Prevents duplicate notifications
- Only shows on supported travel sites

### 4. Storage Management
- Uses Chrome's storage API
- Stores latest deals with timestamp
- Checks deal freshness (5-minute window)
- Clears old deals on new scans
- Persists deals between popup opens

### 5. Supported Travel Sites
- Hotels:
  - booking.com
  - hotels.com
  - expedia.com/hotels
- Flights:
  - kayak.com/flights
  - expedia.com/flights
  - google.com/flights
- Car Rentals:
  - enterprise.com
  - hertz.com
  - expedia.com/car-rentals

### 6. UI States

#### Loading State
- Shows pulsing animation
- Displays "Scanning for deals..." message
- Triggered when scanning starts

#### Initial State
- Shows welcome message on non-travel sites
- Message: "Start planning your trip! Search for flights, hotels, or cars and we'll find you the best deals."

#### Deals Found State
- Shows number of deals found
- Displays deal cards with:
  - Price comparison
  - Savings amount
  - Relevant dates
  - Direct booking links

### 7. Deal Data Format

#### Hotel Deals
```javascript
{
  hotelName: string,
  location: string,
  pricePerNight: string,  // No dollar sign
  originalPrice: string,  // No dollar sign
  checkIn: "YYYY-MM-DD",
  checkOut: "YYYY-MM-DD",
  url: string
}
```

#### Flight Deals
```javascript
{
  airline: string,
  description: string,
  price: string,  // No dollar sign
  originalPrice: string,  // No dollar sign
  departureDate: "YYYY-MM-DD",
  returnDate: "YYYY-MM-DD",
  url: string
}
```

#### Car Rental Deals
```javascript
{
  company: string,
  carType: string,
  location: string,
  pricePerDay: string,  // No dollar sign
  originalPrice: string,  // No dollar sign
  pickUp: "YYYY-MM-DD",
  dropOff: "YYYY-MM-DD",
  url: string
}
```

### 8. Error Handling
- Network errors are caught and logged
- Invalid responses trigger error states
- Storage errors are handled gracefully
- Notification system handles edge cases
- Automatic cleanup of stale data

### 9. Development Notes
- Use `chrome://extensions/` with Developer Mode for testing
- Load unpacked extension from the `extension` directory
- Monitor console logs for debugging
- Test on supported travel sites
- Check notification behavior across pages 