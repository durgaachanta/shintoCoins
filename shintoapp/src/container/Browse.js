import React from 'react';
import axios from 'axios';
import '../styles/styles.css';
import { Link } from 'react-router-dom';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ledgerData: [],
      test: 'test',
    };
  };

  componentDidMount() {
    //fetch ledger data
    axios.get('/fetchledgerdata')

      .then((response) => {
        console.log(response);
        this.setState({ ledgerData: response.data.ledgerdata });
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    return (
      <div className="parentdiv">
        <h1>Browse the Leadger</h1>
        <h3>Here you can browse all Shinto Coin transactions</h3>
        {this.state.ledgerData.length !== 0
          ? (
            <table>
              <tr>
                <th colspan="4">ShintoCoin Ledger</th>
              </tr>
              <tr>
                <th>Action</th>
                <th>Count</th>
                <th>Value</th>
                <th>Details</th>
              </tr>
              {this.state.ledgerData.map((item, idx) => {
                return (
                  <tr>
                    <th>{item.Action}</th>
                    <th>{item.Count}</th>
                    <th>{item.Count}</th>
                    <th><Link to={`/details/${item.id}`}><button>Details</button></Link></th>
                  </tr>
                )
              })}
            </table>
          ) : (<label>No History exists</label>)
        }

      </div >
    )
  }

}
export default Browse;