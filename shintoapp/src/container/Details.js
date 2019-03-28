import React from 'react';
import '../styles/styles.css';
import axios from 'axios';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: null,

    };

  };

  componentDidMount() {
    axios.get(`/fetchrecord/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ detailData: response.data.detaildata });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="parentdiv">
        <h1>Ledger Transaction Details</h1>
        <h3>Detailed view of a transaction from the ledger</h3>
        {this.state.detailData
          ? <div>
            <h3>Transaction # {this.state.detailData.id}</h3>
            <h3>{this.state.detailData.Action} - {this.state.detailData.Count} - ShintoCoins</h3>
          </div>
          : null}

      </div>

    );
  }

}
export default Details;