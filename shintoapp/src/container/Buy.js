import React from 'react';
import axios from 'axios';
import '../styles/styles.css';

class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCoins: '',
      coinsToBuy: '',
    };
  };
  componentDidMount() {
    this.updateShintoCoins();
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  buyCoins = (event) => {
    event.preventDefault();
    axios.post(`/mineorbuycoins/count/${this.state.coinsToBuy}/action/buy`)
      .then((response) => {
        this.setState({ totalCoins: response.data.totalShintoCoins });
      })
      .catch((error) => {
        console.log(error);
      });
    //this.updateShintoCoins();
    this.setState({ coinsToBuy: '' })

  }

  render() {
    return (
      <div className="parentdiv">
        <h1>Buy ShintoCoins</h1>
        <h3>Current ShintoCoin Value: $1:00</h3>
        <h3>Number of ShintoCoins Owned: {this.state.totalCoins}</h3>
        <form onSubmit={this.buyCoins}>
          <label>How many coins do you want to buy?</label>
          <input name="coinsToBuy" onChange={this.handleChange} value={this.state.coinsToBuy} />
          <button className="btn" type="submit">Buy</button>
        </form>
      </div >
    )

  }
}
export default Buy;