import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <main>
        <header>
          <img
            alt="logo"
            className="app-logo"
            src={ logo }
          />
          <p>Sua vez!</p>
          <Switch>
            <Route exact path="/" component={ Login } />
          </Switch>
        </header>
      </main>
    );
  }
}

export default App;
