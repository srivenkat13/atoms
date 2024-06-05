/* for PWA implementation */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("SW Registered !!");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW Registration Failed !!!");
      console.log(error);
    });
}

/* For notifications */

async function registerPeriodicSync() {
  if ("periodicSync" in navigator.serviceWorker.controller) {
    try {
      await navigator.serviceWorker.controller.periodicSync.register({
        tag: "daily-sync",
        minInterval: 60 * 1000,
      });
      console.log("Periodic Sync registered");
    } catch (error) {
      console.error("Periodic Sync registration failed", error);
    }
  } else {
    console.log("Periodic Sync not supported");
  }
}
async function requestPeriodicSyncPermission() {
  try {
    const status = await Notification.requestPermission();
    if (status === 'granted') {
      console.log('Notification permission granted.');
      registerPeriodicSync(); // Try registering after permission is granted
    } else {
      console.log('Notification permission denied.');
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
}

// Call this function when appropriate (e.g., on a button click)
requestPeriodicSyncPermission();

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById("install-banner").style.display = "block";

  document
    .getElementById("install-button")
    .addEventListener("click", async () => {
      document.getElementById("install-banner").style.display = "none";
      deferredPrompt.prompt();
      deferredPrompt = null;
    });
  document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("install-banner").style.display = "none";
  });
  window.addEventListener("appinstalled", () => {
    document.getElementById("install-banner").style.display = "none";
  });
});
const QuoteEle = document.getElementById("quote");

fetch("backend/quotes.json")
  .then((response) => response.json())
  .then((data) => {
    const quotes = data;
    displayQuote(quotes);
  })
  .catch((error) => console.log(`Error Fetching Quote:`, error));

function displayQuote(quotes) {
  let lastIndex = localStorage.getItem("lastQuoteIndex");
  let storedDate = localStorage.getItem("quoteDate");
  const today = new Date().toISOString().split("T")[0];
  console.log(today, storedDate);
  if (storedDate === today && lastIndex !== null) {
    // Use the stored quote index if the date is the same
    const dailyQuote = quotes[parseInt(lastIndex)].quote;
    QuoteEle.textContent = dailyQuote;
    QuoteEle.classList.remove("loading");
  } else {
    // Update the quote if the date is different
    lastIndex = lastIndex ? parseInt(lastIndex) : -1;
    const nextIndex = (lastIndex + 1) % quotes.length;
    const dailyQuote = quotes[nextIndex].quote;
    setTimeout(() => {
      QuoteEle.textContent = dailyQuote;
      QuoteEle.classList.remove("loading");
    }, 1000);

    localStorage.setItem("lastQuoteIndex", nextIndex);
    localStorage.setItem("quoteDate", today);
  }
}

//  modify displayQuote fn to display only one quote throughtout a day

// change the loader
