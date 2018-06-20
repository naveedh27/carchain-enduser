import React, { Component } from 'react';
import ListCar from './ListCars'


class Home extends Component {



  render() {

    return (
      <div style={{marginTop:`30px`}}>

        <ListCar  />
        {/* <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <ListCar listCar={this.state.vehicleList} />
            </Grid.Column>
            <Grid.Column width={4}>
              <Card.Group>
                <Card fluid color='red' header='Option 1' />
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid> */}
      </div>
    );
  }
}

export default Home; 