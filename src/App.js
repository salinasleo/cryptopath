import React, { Component } from 'react';
import Icons from "./components/Icons";
import './App.css';

class App extends Component {

  state = {
    icons: [
      {
        clicked: false,
        url: "/bitcoin",
        src: "./images/bitcoin.ico",
        name: "bitcoin",
        price: "$6,650",
        speed: "20s",
        styling: "App-logo"
      },

      {
        clicked: false,
        url: "/ethereum",
        src: "./images/ethereum.ico",
        name: "ethereum",
        price: "$224",
        speed: "20s",
        styling: "App-logo-counter-fast"
      },

      {
        clicked: false,
        url: "/litecoin",
        src: "./images/litecoin.ico",
        name: "litecoin",
        price: "$54",
        speed: "20s",
        styling: "App-logo-fast"
      },

      {
        clicked: false,
        url: "/monero",
        src: "./images/monero.ico",
        name: "monero",
        price: "$117",
        speed: "20s",
        styling: "App-logo-counter"
      },

      {
        clicked: false,
        url: "/lisk",
        src: "./images/lisk.ico",
        name: "lisk",
        price: "$4.10",
        speed: "20s",
        styling: "App-logo"
      },

      {
        clicked: false,
        url: "/kin",
        src: "./images/kin.ico",
        name: "kin",
        price: "$0.06",
        speed: "20s",
        styling: "App-logo-counter-fast"
      },

      {
        clicked: false,
        url: "/stellar",
        src: "./images/stellar.ico",
        name: "stellar",
        price: "$0.34",
        speed: "20s",
        styling: "App-logo-fast"
      },

      {
        clicked: false,
        url: "/dash",
        src: "./images/dash.ico",
        name: "dash",
        price: "$200",
        speed: "20s",
        styling: "App-logo-counter"
      },

      {
        clicked: false,
        url: "/iota",
        src: "./images/iota.ico",
        name: "iota",
        price: "$0.54",
        speed: "20s",
        styling: "App-logo"
      },

      {
        clicked: false,
        url: "/doge",
        src: "./images/doge.ico",
        name: "doge",
        price: "$0.54",
        speed: "20s",
        styling: "App-logo-counter-fast"
      }
    ]

  };

  renderIcons() {
    return this.state.icons.map((icon, index) => (
      <Icons {...icon} alt={icon.name} handleClick={this.handleClick} />
    ));
  }


  handleClick = event => {
    console.log(event.target);
    const { id } = event.target.dataset;
    let icons = [...this.state.icons];
    console.log(id);
    console.log(icons);
    
    // const icon = icons[id];
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">

          {this.renderIcons()}
          {/* <img src={bitcoin} className="App-logo" alt="bitcoin" />
          <img src={ethereum} className="App-logo-counter" alt="ethereum" />
          <img src={monero} className="App-logo" alt="monero" />
          <img src={litecoin} className="App-logo-counter" alt="litecoin" />
          <img src={lisk} className="App-logo" alt="lisk" />
          <img src={kin} className="App-logo-counter" alt="kin" />
          <img src={stellar} className="App-logo" alt="stellar" />
          <img src={dash} className="App-logo-counter" alt="dash" />
          <img src={iota} className="App-logo" alt="iota" /> */}
          <h1 className="App-title">Welcome to CryptoPath</h1>
        </header>
        <p className="App-intro">
          Don't be the one left holding the bag!
        </p>
      </div>
    );
  }
}

export default App;
