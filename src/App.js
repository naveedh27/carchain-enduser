import React, { Component } from 'react';

import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Layout from './components/Layout';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Error from './components/Error';
import MenuExample from './components/Menu';
import Insurance from './components/Insurance';
import 'semantic-ui-css/semantic.min.css';
import AddCar from './components/AddCar';
import Market from './components/Market';
import LoginHandler from './util/LoginHandler';

var util = require('./util/Util');
var user = util.default.user;


class App extends Component {

  state = {
    carsVin: ''
  }

  setcarVins = (dataFromChild) => {
    this.setState({ carsVin: dataFromChild });
  }

  render() {

    return (
      <div>
        <BrowserRouter>
          <Layout>
            <MenuExample />
            <Switch>
              <Route path="/Login" component={LoginHandler} exact />
              <PrivateRoute path="/" exact component={Home} getCarVins={this.setcarVins} />
              <PrivateRoute path="/Contact" component={Contact} exact />
              <PrivateRoute path="/About" component={About} exact />
              <PrivateRoute path="/AddCar" component={AddCar} exact />
              <PrivateRoute path="/Insurance" component={Insurance} exact carvin={this.state.carsVin} />
              <PrivateRoute path="/Market" component={Market} exact />
              <PrivateRoute component={Error} />
            </Switch>
          </Layout>
        </BrowserRouter>

      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    user.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/Login' />
  )} />
)


export default App;
