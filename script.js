const QuoteEle = document.getElementById("quote");

fetch("quotes_clone.json")
  .then((response) => response.json())
  .then((data) => {
    const quotes = data;
    displayQuote(quotes);
  })
  .catch((error) => console.log(`Error Fetching Quote:`, error));

function displayQuote(quotes) {
  let lastIndex = localStorage.getItem('lastQuoteIndex')
  let storedDate = localStorage.getItem('quoteDate');
  const today = new Date().toISOString().split('T')[0];
  console.log(today,storedDate);
  if (storedDate === today && lastIndex !== null) {
    // Use the stored quote index if the date is the same
    const dailyQuote = quotes[parseInt(lastIndex)].quote;
    QuoteEle.textContent = dailyQuote;
    QuoteEle.classList.remove('loading');
  } else {
    // Update the quote if the date is different
    lastIndex = lastIndex ? parseInt(lastIndex) : -1;
    const nextIndex = (lastIndex + 1) % quotes.length;
    const dailyQuote = quotes[nextIndex].quote;
  setTimeout(() => {
    QuoteEle.textContent = dailyQuote;
    QuoteEle.classList.remove('loading');
}, 1000);

localStorage.setItem('lastQuoteIndex',nextIndex)
localStorage.setItem('quoteDate', today);
}
}

//  modify displayQuote fn to display only one quote throughtout a day

// change the loader
