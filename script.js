const QuoteEle = document.getElementById("quote");

fetch("quotes.json")
  .then((response) => response.json())
  .then((data) => {
    const quotes = data;
    displayQuote(quotes);
  })
  .catch((error) => console.log(`Error Fetching Quote:`, error));

function displayQuote(quotes) {
  let lastIndex = localStorage.getItem('lastQuoteIndex')
  lastIndex = lastIndex ? parseInt(lastIndex) : -1;
  const nextIndex = (lastIndex+1) % quotes.length;
  const dailyQuote = quotes[nextIndex].quote;
  setTimeout(() => {
    QuoteEle.textContent = dailyQuote;
    QuoteEle.classList.remove('loading');
}, 1000);

localStorage.setItem('lastQuoteIndex',nextIndex)
}


//  modify displayQuote fn to display only one quote throughtout a day

// change the loader