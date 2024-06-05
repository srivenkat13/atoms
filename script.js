/* for PWA implementation */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.info("SW Registered !!");
    })
    .catch((error) => {
      console.warn("SW Registration Failed !!!");
      console.log(error);
    });
}

/* Install Banner, Setup */
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
/* Fetch and Display Quotes */
const QuoteEle = document.getElementById("quote");

fetch("backend/quotes.json")
  .then((response) => response.json())
  .then((data) => {
    const quotes = data;
    displayQuote(quotes);
  })
  .catch((error) => console.log(`Error Fetching Quote:`, error));

function displayQuote(quotes) {
  const today = new Date().toISOString().split("T")[0];
  let lastIndex = localStorage.getItem("lastQuoteIndex");
  let storedDate = localStorage.getItem("quoteDate");
  
  if (storedDate === today && lastIndex !== null) {
    QuoteEle.textContent = quotes[parseInt(lastIndex)].quote;
    QuoteEle.classList.remove("loading");
  } else {
    lastIndex = lastIndex ? parseInt(lastIndex) : -1;
    const nextIndex = (lastIndex + 1) % quotes.length;
    
    setTimeout(() => {
      QuoteEle.textContent = quotes[nextIndex].quote;
      QuoteEle.classList.remove("loading");
      showConfetti()
    }, 1000);
    
    localStorage.setItem("lastQuoteIndex", nextIndex);
    localStorage.setItem("quoteDate", today);
  }
}

function showConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}


// change the loader
