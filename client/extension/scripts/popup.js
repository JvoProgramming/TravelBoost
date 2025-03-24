document.addEventListener('DOMContentLoaded', function() {
  const resultElement = document.getElementById('result');
  const dealsContainer = document.getElementById('dealsContainer');
  const statusCard = document.querySelector('.status-card');
  const statusIcon = document.querySelector('.status-icon');

  // different templates for different types of deals
  const dealTemplates = {
    flight: (deal) => `
      <a href="${deal.url}" target="_blank" class="deal-item flight-deal">
        <strong>${deal.airline}</strong>
        <p>${deal.description}</p>
        <div class="price-container">
          <p class="price">$${deal.price}</p>
          <p class="original-price">$${deal.originalPrice}</p>
          <p class="savings">Save $${(parseFloat(deal.originalPrice.replace(',', '')) - parseFloat(deal.price)).toFixed(0)}</p>
        </div>
        <div class="dates">
          <p>Departure: ${new Date(deal.departureDate).toLocaleDateString()}</p>
          <p>Return: ${new Date(deal.returnDate).toLocaleDateString()}</p>
        </div>
      </a>
    `,
    hotel: (deal) => `
      <a href="${deal.url}" target="_blank" class="deal-item hotel-deal">
        <strong>${deal.hotelName}</strong>
        <p>${deal.location}</p>
        <div class="price-container">
          <p class="price">$${deal.pricePerNight}/night</p>
          <p class="original-price">$${deal.originalPrice}</p>
          <p class="savings">Save $${(parseFloat(deal.originalPrice) - parseFloat(deal.pricePerNight)).toFixed(0)}/night</p>
        </div>
        <div class="dates">
          <p>Check-in: ${deal.checkIn}</p>
          <p>Check-out: ${deal.checkOut}</p>
        </div>
      </a>
    `,
    car: (deal) => `
      <a href="${deal.url}" target="_blank" class="deal-item car-deal">
        <strong>${deal.company}</strong>
        <p>${deal.carType} - ${deal.location}</p>
        <div class="price-container">
          <p class="price">$${deal.pricePerDay}/day</p>
          <p class="original-price">$${deal.originalPrice}/day</p>
          <p class="savings">Save $${(parseFloat(deal.originalPrice) - parseFloat(deal.pricePerDay)).toFixed(0)}/day</p>
        </div>
        <div class="dates">
          <p>Pick-up: ${new Date(deal.pickUp).toLocaleDateString()}</p>
          <p>Drop-off: ${new Date(deal.dropOff).toLocaleDateString()}</p>
        </div>
      </a>
    `
  };

  function setLoadingState(isLoading) {
    if (isLoading) {
      statusIcon.style.display = 'block';
      resultElement.textContent = "Scanning for deals...";
    } else {
      statusIcon.style.display = 'none';
    }
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SCANNING_STARTED') {
      dealsContainer.innerHTML = '';
      resultElement.textContent = "Scanning for deals...";
      setLoadingState(true);
    } else if (message.type === 'DEALS_FOUND') {
      setLoadingState(false);
      displayDeals(message.deals, message.category);
    }
  });

  function displayDeals(deals, category) {
    if (!deals || deals.length === 0) {
      resultElement.textContent = "Start planning your trip! Search for flights, hotels, or cars and we'll find you the best deals.";
      dealsContainer.innerHTML = '';
      return;
    }

    resultElement.textContent = `Found ${deals.length} better ${category} deals for you!`;
    dealsContainer.innerHTML = deals.map(deal => dealTemplates[category](deal)).join('');
  }

  // Check if current site is a supported travel site
  function isSupportedSite(url) {
    const supportedDomains = [
      'expedia.com',
      'kayak.com',
      'booking.com',
      'hotels.com',
      'google.com/flights',
      'enterprise.com',
      'hertz.com'
    ];
    return supportedDomains.some(domain => url.includes(domain));
  }

  // Get the current tab and check storage first
  chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    const currentTab = tabs[0];
    
    if (isSupportedSite(currentTab.url)) {
      // Check storage for recent deals first
      chrome.storage.local.get(['lastDeals'], function(result) {
        if (result.lastDeals) {
          const storedDeals = result.lastDeals;
          // Check if deals are fresh (less than 5 minutes old)
          const isFresh = new Date() - new Date(storedDeals.timestamp) < 5 * 60 * 1000;
          
          if (isFresh) {
            // Use stored deals if fresh
            setLoadingState(false);
            displayDeals(storedDeals.deals, storedDeals.category);
            return;
          }
        }
        
        // Only scan if no fresh deals found
        setLoadingState(true);
        chrome.tabs.sendMessage(currentTab.id, { action: 'scanForDeals' });
      });
    } else {
      // Not on supported site
      resultElement.textContent = "Start planning your trip! Search for flights, hotels, or cars and we'll find you the best deals.";
    }
  });

  // mock data for testing different types of deals
  /*const mockDeals = {
    flight: [
      {
        airline: 'United Airlines',
        description: 'New York (JFK) to London (LHR)',
        price: '449',
        originalPrice: '689',
        departureDate: '2024-05-15',
        returnDate: '2024-05-22',
        url: 'https://united.com/deals/nyc-london'
      }
    ],
    hotel: [
      {
        hotelName: 'Marriott Downtown',
        location: 'Manhattan, New York',
        pricePerNight: '199',
        originalPrice: '299',
        checkIn: '2024-05-15',
        checkOut: '2024-05-22',
        url: 'https://marriott.com/nyc-downtown'
      }
    ],
    car: [
      {
        company: 'Enterprise',
        carType: 'SUV',
        location: 'JFK Airport',
        pricePerDay: '45',
        originalPrice: '89',
        pickUp: '2024-05-15',
        dropOff: '2024-05-22',
        url: 'https://enterprise.com/jfk-suv'
      }
    ]
  };*/

  // for testing - display just flight deals (simulating being on a flight website)
  //displayDeals(mockDeals.flight, 'flight');
}); 