import React, { Component } from 'react'
import { Menu, Segment, Icon, Popup, Grid, Header } from 'semantic-ui-react'

import { NavLink } from 'react-router-dom'

var util = require('../util/Util');
var user = util.default.user;

export default class TopMenu extends Component {
  state = { counter: 10, balance: 0 }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  updateBalance = async () => {
    await user.authenticate(user.name);
    this.setState({balance:user.balance});
  }

  render() {



    return (
      <div style={{ marginBottom: `20px` }}>
        {/* <Segment inverted> */}
        <Menu inverted pointing>
          <Menu.Item
            name='Home'
            as={NavLink}
            exact
            to="/"
            onClick={this.handleItemClick} />
          <Menu.Item
            name='Insurance'
            as={NavLink}
            exact
            to="/Insurance"
            onClick={this.handleItemClick} />
          {/* <Menu.Item
              name='Transfer Ownership'
              as={NavLink}
              exact
              to="/transfer"
              onClick={this.handleItemClick} /> */}
          <Menu.Item
            name='MarketPlace'
            as={NavLink}
            exact
            to="/market"
            onClick={this.handleItemClick} />
          {/* <Menu.Item
              name='Add Car'
              as={NavLink}
              exact
              to="/AddCar"
              onClick={this.handleItemClick} /> */}
          {/* <Menu.Item
              name='About Us'
              as={NavLink}
              exact
              to="/About"
              onClick={this.handleItemClick}
            />*/}

          <Menu.Menu position='right'>

            <Menu.Item>
              <Popup trigger={<Icon circular name='user' size='large' color='grey'>
                <Header color='brown' as='h4'>{user.name}</Header>
              </Icon>} >
                <Grid centered>
                  <Grid.Column textAlign='left'>
                    <Header as='h4'>Balance : {user.balance}</Header>
                    <Header as='h4'>Phone : {user.contact}</Header>
                    <Header as='h4'>Email : {user.email}</Header>
                  </Grid.Column>
                </Grid>
              </Popup>
            </Menu.Item>

            {user.name != '' ?
              <Menu.Item
                onClick={this.updateBalance}>
                <Icon circular name='refresh' size='large' color='grey' />
              </Menu.Item>
              : ' '}

            {user.name != '' ?
              <Menu.Item
                onClick={() => { window.location.reload() }}>
                <Icon circular name='sign out alternate' size='large' color='grey'>
                  <Header color='brown' as='h4'>Logout</Header>
                </Icon>
              </Menu.Item>

              : ' '}

          </Menu.Menu>
        </Menu>
        {/* </Segment> */}
      </div>
    )
  }
}