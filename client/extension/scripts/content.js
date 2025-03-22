// monitor URL changes and send page data to backend
let lastUrl = location.href;

async function sendToBackend() {
  try {
    chrome.runtime.sendMessage({ 
      type: 'SCANNING_STARTED'
    });

    console.log('Sending page data for:', window.location.hostname);
    
    // send current page data to backend
    const response = await fetch('https://api.travelboost.com/v1/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: window.location.href,
        timestamp: new Date().toISOString(),
        title: document.title,
        hostname: window.location.hostname,
        content: document.documentElement.innerHTML
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // send to popup
    chrome.runtime.sendMessage({ 
      type: 'DEALS_FOUND',
      category: data.category,
      deals: data.deals
    });

  } catch (error) {
    console.error('Error sending data:', error);
    chrome.runtime.sendMessage({ 
      type: 'DEALS_FOUND',
      category: 'unknown',
      deals: []
    });
  }
}

// watch for URL changes
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    console.log('URL changed from:', lastUrl);
    console.log('URL changed to:', location.href);
    lastUrl = location.href;
    sendToBackend();
  }
}).observe(document, { subtree: true, childList: true });

// initial check
window.addEventListener('load', () => {
  sendToBackend();
}); 