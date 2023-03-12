import React from 'react';
import logo from './logo.svg';
import './CSS/App.css';
import { getQuote } from './Functions/quoteFunctions.js';



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
      let randomQuote = getQuote();

      this.setState({
          quote: randomQuote.quote,
          author: randomQuote.author,
          color: colors[Math.floor(Math.random() * 12)],
          twitterURL: "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
            encodeURIComponent('"' + randomQuote.quote + '" ' + randomQuote.author),
          tumblrURL: 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
          encodeURIComponent(randomQuote.quote ) +
          '&content=' +
          encodeURIComponent(randomQuote.author) +
          '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
      });
  };

  //Get random quote on first Load
  componentDidMount() {
    let randomQuote = getQuote();

    this.setState({
      quote: randomQuote.quote,
      author: randomQuote.author,
      color: colors[Math.floor(Math.random() * 12)],
      twitterURL: 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
          encodeURIComponent('"' + randomQuote.quote + '" ' + randomQuote.author),
      tumblrURL: 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
          encodeURIComponent(randomQuote.quote ) +
          '&content=' +
          encodeURIComponent(randomQuote.author) +
          '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
    });
  };

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
