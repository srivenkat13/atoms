const puppeteer = require("puppeteer");
const fs = require("fs");
const { generateMagicParam, generateThursdays } = require("./dateUtil");

const magicParam = generateMagicParam();
const thursdays = generateThursdays();

async function fetchQuotes(param) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = `https://jamesclear.com/3-2-1/${param}`;
  await page.goto(url);

  // Get the text content of the entire page
  const textContent = await page.evaluate(() => {
    return document.body.innerText;
  });

  const quotes = [];
  const quotePatternNew = /“([^"]*?)”/gs;
  let match;
  let quoteCount = 0;
  while ((match = quotePatternNew.exec(textContent)) !== null) {
    quotes.push({
      quote: match[1].trim(),
    });
    quoteCount++;
    if (quoteCount === 3) {
      break;
    }
  }

  let exisitngQuotes = [];
  try {
    const exisitngJson = fs.readFileSync("quotes_clone.json", "utf-8");
    exisitngQuotes = JSON.parse(exisitngJson);
  } catch (error) {
    console.log(`Error is reading Exisitng json:`, error);
  }

  const allQuotes = exisitngQuotes.concat(quotes);
  const jsonContent = JSON.stringify(allQuotes, null, 2);
  fs.writeFileSync("quotes_clone.json", jsonContent);

  console.log("Quotes have been saved to quotes.json");

  await browser.close();
}

fetchQuotes(magicParam);

// for bulk loading the quotes
(async () => {
  for (const thursday of thursdays) {
    try {
      await fetchQuotes(thursday);
      console.log(` fetched from https://jamesclear.com/3-2-1/${thursday}`);
    } catch (err) {
      console.log(
        `Error fetching quotes from https://jamesclear.com/3-2-1/${thursday}`,
        err
      );
    }
  }
})();
