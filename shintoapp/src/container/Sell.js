import React from 'react';
import axios from 'axios';
import '../styles/styles.css';

class Sell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCoins: '',
      coinsToSell: '',
      message: '',
    };

  };

  componentDidMount() {
    this.updateShintoCoins();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateShintoCoins = () => {
    //get call to express server to fetch the shinto counter
    axios.get('/ownedcoins')
      .then((response) => {
        this.setState({ totalCoins: response.data.ownedCoins });
      })
      .catch((error) => {
        console.log(error);
      });

  }

  sellCoins = (e) => {
    console.log("sell coins");
    e.preventDefault();
    //sell only if totalcoins > coinsToSell
    var coinsToSell = this.state.coinsToSell;
    if (parseInt(this.state.totalCoins) >= parseInt(coinsToSell)) {
      //post call - pass info to server 
      axios.post(`/sellcoins/${coinsToSell}`)
        .then((response) => {
          this.setState({ totalCoins: response.data.totalShintoCoins, message: `Shinto coins sold ${coinsToSell}` });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      this.setState({ message: `You own ${this.state.totalCoins} coins. Cannot sell ${coinsToSell} coins at this time.` })
    }
    this.setState({ coinsToSell: '' });
  }

  render() {
    return (
      <div className="parentdiv">
        <h1>Sell ShintoCoins</h1>
        <h3>Current ShintoCoin Value: $1:00</h3>
        <h3>Number of ShintoCoins Owned:{this.state.totalCoins} </h3>
        <form onSubmit={this.sellCoins}>
          <label> How many ShintoCoins do you want to sell?</label>
          <input name="coinsToSell" value={this.state.coinsToSell} onChange={this.handleChange} />
          <button className="btn">Sell</button>
        </form>
        <h3>{this.state.message}</h3>

      </div >

    )
  }
}

export default Sell;