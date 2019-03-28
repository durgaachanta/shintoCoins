import React, { Component } from 'react';
import { Switch, Redirect } from "react-router";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import logo from './images/shintoapplogo.png';
import Home from './container/Home';
import Mine from './container/Mine';
import Buy from './container/Buy';
import Sell from './container/Sell';
import Browse from './container/Browse';
import Details from './container/Details';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* changes the route of the page when a nav button is clicked */}
          <div>
            <img className="App-logo" src={logo} alt="logo" />
            <ul className="headerelement">
              <li className="navbar"><Link className="navtag" to="/home">Home</Link></li>
              <li className="navbar"><Link className="navtag" to="/mine">Mine Coins</Link></li>
              <li className="navbar"><Link className="navtag" to="/buy">Buy Coins</Link></li>
              <li className="navbar"><Link className="navtag" to="/sell">Sell Coins</Link></li>
              <li className="navbar"><Link className="navtag" to="/ledger">Browse Ledger</Link></li>
            </ul>
          </div>
          {/* When the route changes - my component on the page should change */}
          <Switch>
            <Redirect exact from='/' to='/home' />
            <Route path="/home" component={Home} />
            <Route path="/mine" component={Mine} />
            <Route path="/buy" component={Buy} />
            <Route path="/sell" component={Sell} />
            <Route path="/ledger" component={Browse} />
            <Route path="/details/:id" component={Details} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
