import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './Components/history';
//import Gameview from './Components/Gameview';
import Gameviewtest from './Components/Gameviewtest';
import GameWaitingView from './Components/GameWaitingView';
//import Home from './Components/Home';
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* <Route exact path="/" component={Gameview} /> */}
          <Route exact path="/:users?" component={Gameviewtest} />
          {/* <Route path = "/test/:users" component = {Gameviewtest} /> */}
          <Route path = "/waiting/:room_id/:token" component={GameWaitingView} />
          {/*<Route exact path="/:token" component={Gameview} />*/}
        </Switch>
      </Router>
    );
  }
}

export default App;
