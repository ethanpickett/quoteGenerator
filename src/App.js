import React from 'react';
import './CSS/App.css';

let colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

let quotes = [{quote: '', author: ''}];

let randomIndex = 0;


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          quote: '',
          author: '',
          color: '',
          twitterURL: '',
          tumblrUrl: ''
      };
      this.handleClick = this.handleClick.bind(this);
  }

  //On click get random quote from array and set the state 
  handleClick () {
      
      randomIndex = Math.floor(Math.random() * quotes.length)

      this.setState({
        quote: quotes[randomIndex].quote,
        author: quotes[randomIndex].author,
        color: colors[Math.floor(Math.random() * 12)],
        twitterURL: "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
          encodeURIComponent('"' + quotes[randomIndex].quote + '" ' + quotes[randomIndex].author),
        tumblrURL: 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
          encodeURIComponent(quotes[randomIndex].quote ) +
          '&content=' +
          encodeURIComponent(quotes[randomIndex].author) +
          '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
      });
  };

  //Get random quote on first Load
  async componentDidMount() {
    try {
      const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
      const responseJson = await response.json();
      quotes = responseJson.quotes;
  
      randomIndex = Math.floor(Math.random() * quotes.length);
  
      this.setState({
        quote: quotes[randomIndex].quote,
        author: quotes[randomIndex].author,
        color: colors[Math.floor(Math.random() * 12)],
        twitterURL: "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
            encodeURIComponent('"' + quotes[randomIndex].quote + '" ' + quotes[randomIndex].author),
        tumblrURL: 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
            encodeURIComponent(quotes[randomIndex].quote ) +
            '&content=' +
            encodeURIComponent(quotes[randomIndex].author) +
            '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
      });
    } catch (error) {
      console.error(error);
    }
  }
 
  
  



  render() {

      //Handle dynamic Compnent Styles here
      let buttonStyle = {
        backgroundColor: this.state.color
      }

      //Change style outside of component
      document.body.style.backgroundColor = this.state.color;


      return (
      <div id="wrapper">
        <div id="quote-box">

          <div class="quote-text">
            <i class="fa fa-quote-left"></i> 
            <span id="text">
              {this.state.quote} 
            </span> 
            <i class="fa fa-quote-right"></i>
          </div>

          <div class="quote-author">- 
            <span id="author">
              {this.state.author}
            </span>
          </div>

          <div class="buttons">
          
          {/* target _blank means new tab */}
            <a class="button" id="tweet-quote" title="Tweet this quote!" target="_blank" style={buttonStyle} href={this.state.twitterURL}>
              <i class="fa fa-twitter"></i>
            </a>

            <a class="button" id="tumblr-quote" title="Post this quote on tumblr!" target="_blank" style={buttonStyle} href={this.state.tumblrURL}>
              <i class="fa fa-tumblr"></i>
            </a>

            <button class="button" id="new-quote" onClick={this.handleClick} style={buttonStyle}>New Quote</button>

          </div>
        </div>
        <div class="footer">by Ethan</div>
      </div>
      );
  }
}

export default App;
