import React from 'react';
import '../styles/styles.css';
import axios from 'axios';


class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: '',
      choosenNumber: '',
      totalShintoCoins: 0,

    };
  };

  //mine Shinto coins
  mineCoins = (event) => {
    event.preventDefault();
    console.log("it is time to mine some shinto coins");
    var coins = Math.floor(Math.random() * this.state.choosenNumber);
    //Make a post call to the server to save this info

    this.setState({ coins, choosenNumber: '' }, () => {
      if (this.state.coins !== '') {
        axios.post(`/mineorbuycoins/count/${this.state.coins}/action/mine`)
          .then((response) => {
            this.setState({ totalShintoCoins: response.data.totalShintoCoins });
          })
          .catch((error) => {
            console.log(error);
          });
      }

    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (

      <div className="parentdiv">
        <h1>Mine ShintoCoins</h1>
        <p>Here you can mine ShintoCoins by being the first to click on the below awesome button!</p>
        <form onSubmit={this.mineCoins}>
          <label>Type in your favourite fibonacci Number:</label>
          <input name="choosenNumber" onChange={this.handleChange} value={this.state.choosenNumber} />
          <button className="btn">Mine Coins</button>
        </form>
        {this.state.coins
          ? (
            <div>
              <h2> ShintoCoins mined: {this.state.coins}</h2>
              <h2>Total Shinto Coins owned so far: {this.state.totalShintoCoins}</h2>
            </div>
          ) : ''
        }

      </div>
    );
  }
}

export default Mine;



