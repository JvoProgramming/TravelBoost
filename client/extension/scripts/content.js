// Remove URL monitoring and only keep the scanning function
let lastUrl = location.href;

// Add a flag to track if notification was already shown
let notificationShown = false;

// Create and add notification badge to page
function showDealNotification(deals, isFromPopup = false) {
  // Don't show notification if it's from popup open or already shown
  if (isFromPopup || notificationShown) {
    return;
  }

  // Remove any existing notification
  const existingNotification = document.getElementById('travelboost-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'travelboost-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  `;

  const savings = deals.reduce((max, deal) => {
    const saving = parseFloat(deal.originalPrice) - parseFloat(deal.pricePerNight || deal.price || deal.pricePerDay);
    return Math.max(max, saving);
  }, 0);

  notification.innerHTML = `
    <div style="font-size: 16px;">💰 Better deal found! Save up to $${savings.toFixed(0)}</div>
    <div style="font-size: 12px; opacity: 0.9">Click to view details</div>
  `;

  // Add click handler to open extension
  notification.addEventListener('click', () => {
    // Open the extension popup using chrome.runtime.sendMessage
    chrome.runtime.sendMessage({ type: 'OPEN_EXTENSION' });
    // Remove the notification after clicking
    notification.remove();
  });

  // Add to page
  document.body.appendChild(notification);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease';
    setTimeout(() => notification.remove(), 500);
  }, 10000);

  // Mark as shown
  notificationShown = true;
}

async function sendToBackend(isFromPopup = false) {
  try {
    chrome.storage.local.remove('lastDeals');
    
    chrome.runtime.sendMessage({ 
      type: 'SCANNING_STARTED'
    });

    const response = await fetch('http://localhost:3000/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        title: document.title,
        locationData: window.location,
        timestamp: new Date().toISOString(),
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.deals && data.deals.length > 0) {
      showDealNotification(data.deals, isFromPopup);
    }
    
    chrome.storage.local.set({
      lastDeals: {
        type: 'DEALS_FOUND',
        category: data.category,
        deals: data.deals,
        timestamp: new Date().toISOString()
      }
    });
    
    chrome.runtime.sendMessage({ 
      type: 'DEALS_FOUND',
      category: data.category,
      deals: data.deals
    });

  } catch (error) {
    console.error('Error sending data:', error);
    chrome.storage.local.remove('lastDeals');
    chrome.runtime.sendMessage({ 
      type: 'DEALS_FOUND',
      category: 'unknown',
      deals: []
    });
  }
}

// Listen for manual scan requests
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'scanForDeals') {
    sendToBackend(true); // Pass true to indicate it's from popup
  }
});

// Reset notification flag on URL change
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    notificationShown = false; // Reset flag
    sendToBackend();
  }
}).observe(document, { subtree: true, childList: true });

// Initial check
window.addEventListener('load', () => {
  sendToBackend();
}); 