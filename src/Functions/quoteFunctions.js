import $ from 'jquery';


let currentQuote = '',
    currentAuthor = '';

//Create array of quotes
let quotesData;

//Pull list of quotes back from quotes.json and store in quotesData array
function getQuotes() {
    return $.ajax({
      headers: {
        Accept: 'application/json'
      },
      url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
      success: function (jsonQuotes) {
        if (typeof jsonQuotes === 'string') {
          quotesData = JSON.parse(jsonQuotes);
          console.log('quotesData');
          console.log(quotesData);
        }
      }
    });
}

//Get random quote from the quotesData array
function getRandomQuote() {
    return quotesData.quotes[
      Math.floor(Math.random() * quotesData.quotes.length)
    ];
}


export function getQuote() {
  let randomQuote = getRandomQuote();

  return randomQuote;
}


//Fill qoutes array when page loads
$(document).ready(function () {
    getQuotes()
  });

