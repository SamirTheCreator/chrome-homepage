
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

const d = new Date();
var time = d.toLocaleTimeString();
var date = d.toLocaleDateString();
document.getElementById("time").innerHTML = time;
document.getElementById("date").innerHTML = date;

// Fetch quote from API
async function fetchQuote() {
const url = 'https://type.fit/api/quotes';

try {
    const response = await fetch(url);

    if (!response.ok) {
    throw new Error('Request not found');
    }

    const quotes = await response.json();

    return quotes;
} catch (e) {
    alert(e);
}
}

function tweetQuote() {
const twitterQuoteUrl = `https://twitter.com/intent/tweet?text=${quoteEl.textContent} - ${quoteAuthorEl.textContent}`;

window.open(twitterQuoteUrl, '_blank');
}

const quotesPromise = fetchQuote();
const quoteEl = document.getElementById('quote');
const quoteAuthorEl = document.getElementById('author');

document.getElementById('new-quote').addEventListener('click', function (e) {
quotesPromise.then(quotes => {
    const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteText = quotes[randomQuoteIndex].text;
    let author = quotes[randomQuoteIndex].author;

    if (!author) {
    author = 'Unknown';
    }

    if (quoteText.length > 120) {
    quoteEl.classList.add('long-quote');
    } else {
    quoteEl.classList.remove('long-quote');
    }

    quoteEl.textContent = quoteText;
    quoteAuthorEl.textContent = author;
});
});

document.getElementById('twitter').addEventListener('click', tweetQuote);