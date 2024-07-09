import { copyQuote, showToast } from "./util.js";

const setQuoteBtn = document.getElementById("set-quote");
const randomQuoteBtn = document.getElementById("set-random");
const likeBtn = document.getElementById("like-btn");
const favoritesBtn = document.getElementById("list-fav");
let lastQuoteIndex;
let quotes;
let currentIndex;

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
const QuoteContainer = document.getElementsByClassName("quote-container")[0];
const FavELe = document.getElementById("fav");
const FavContainer = document.getElementsByClassName("fav-container")[0];

fetch("backend/quotes.json")
  .then((response) => response.json())
  .then((data) => {
    quotes = data;
    displayQuote(quotes);
  })
  .catch((error) => console.log(`Error Fetching Quote:`, error));

function displayQuote(quotes) {
  const today = new Date().toISOString().split("T")[0];
  let lastIndex = localStorage.getItem("lastQuoteIndex");
  let storedDate = localStorage.getItem("quoteDate");

  if (storedDate === today && lastIndex !== null) {
    currentIndex = parseInt(lastIndex);
    QuoteEle.textContent = quotes[parseInt(lastIndex)].quote;
    QuoteEle.classList.remove("loading");
  } else {
    lastIndex = lastIndex ? parseInt(lastIndex) : -1;
    currentIndex = (lastIndex + 1) % quotes.length;

    setTimeout(() => {
      QuoteEle.textContent = quotes[currentIndex].quote;
      QuoteEle.classList.remove("loading");
      showConfetti();
    }, 1000);

    localStorage.setItem("lastQuoteIndex", currentIndex);
    localStorage.setItem("quoteDate", today);
  }
}

function showConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

function displayRandomQuote(quotes) {
  currentIndex = Math.floor(Math.random() * quotes.length);
  QuoteEle.textContent = quotes[currentIndex].quote;
}

function saveFavQuoteIndex(index) {
  let favoriteIndexes =
    JSON.parse(localStorage.getItem("favoriteIndexes")) || [];
  if (!favoriteIndexes.includes(index)) {
    favoriteIndexes.push(index);
    localStorage.setItem("favoriteIndexes", JSON.stringify(favoriteIndexes));
  }
}

function displayFavoriteQuotes() {
  const favoriteIndexes = JSON.parse(localStorage.getItem("favoriteIndexes"));
  FavELe.innerHTML = "";
  if (favoriteIndexes !== null) {
    favoriteIndexes.forEach((value, index) => {
      if (quotes && quotes[value]) {
        const quote = quotes[value].quote;
        FavELe.innerHTML += `<p>${index + 1} > ${quote}</p>`;
      }
    });
    showToast(`You toggled favorites`);
  } else {
    showToast("No favorites added 😦");
  }
}

setQuoteBtn.addEventListener("click", () => {
  lastQuoteIndex = prompt("Set localStorage ? Enter quote index");
  if (lastQuoteIndex !== null) {
    showToast(`Displaying ${lastQuoteIndex}th  quote 👀`);
    localStorage.setItem("lastQuoteIndex", lastQuoteIndex);
    QuoteEle.textContent = quotes[lastQuoteIndex].quote;
  }
  return;
});

randomQuoteBtn.addEventListener("click", () => {
  displayRandomQuote(quotes);
  showToast(`Random quote🔀`);
});

likeBtn.addEventListener("click", () => {
  like.setAttribute("opacity", "1");
  saveFavQuoteIndex(currentIndex);
  showToast(`Saved to favorites❣️`);
});

favoritesBtn.addEventListener("click", () => {
  displayFavoriteQuotes();
  QuoteContainer.classList.toggle("hidden");
  FavContainer.classList.toggle("hidden");
});
