import React, { Component } from 'react';
import { Card, Segment, Grid, Item, List, Button, Image, Table, Container, Header, Label, Icon, Divider, Modal } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from "react-router-dom";


var util = require('../util/Util');
var user = util.default.user;
var url = util.default.endpoint;

console.log(url);

class Home extends Component {

  constructor(props) {
    super();
    this.state = {
      listCar: null,
      vehicleList: '',
      eachCar: []
    }

  }

  async componentDidMount() {
    let vehicles = ''
    try {
      vehicles = await axios.get(url.url + 'queries/getVehicleDetailsAccToCustomerID?owner=' + user.name);
      this.getInsuranceDetails(await vehicles.data);
      console.log(vehicles.data);

      let data = vehicles.data, vins = '';
      Object.keys(data).map(function (key) {
        vins = data[key].vin + "," + vins;
      });

      user.vins = vins.slice(0, -1);

      user.vins = user.vins.split(",");



    } catch (e) {
      this.setState({ listCar: '' });
    }



  }

  getInsuranceDetails = async (allVehicle) => {

    var result = Object.keys(allVehicle).map(function (key) {
      return [(key), allVehicle[key]];
    });

    console.log(result);

    let allIns = result.map(async (key, val) => {
      let acData = key[1];
      return await axios.get(url.url + 'queries/getInsuranceDetailsAccToVehicleNo?vin=' + acData.vin);
    });

    let finalData = [];
    await Promise.all(allIns).then(async (completed) => {
      allIns.map(async (each) => {
        each.then(async (result) => {
          finalData.push(result);
        }).catch(async (err) => {
          console.log(err);
        })
      })
    }).catch(async (err) => {
      console.log(err);
    });

    let a = this.state.eachCar.slice(); //creates the clone of the state
    // a[i] = <Label>{element.} </Label>
    //this.setState({ arr: a });

    finalData.forEach(function (element, i) {

      let reqData = element.data;
      if (reqData.length > 0) {
        a[i] = <Item>
          <Item.Content>
            <Item.Header>
              <Header as='h2'>{reqData[0].InsuranceName}</Header>
            </Item.Header>
            <Item.Meta></Item.Meta>
            <Item.Description>
              <List horizontal>
                <List.Item>
                  <List.Content>
                    <List.Header size='h2'>Insurance Reference No.</List.Header>
                    {reqData[0].CurrentInsuranceNumber}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Modal trigger={<Button primary>More Info</Button>}>
                    <Modal.Header>{reqData[0].InsuranceName}</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <Header>Duration : {reqData[0].InsuranceDuration}</Header>
                        <Header>Expires on {new Date(reqData[0].CurrentInsuranceExpiry).toLocaleDateString()} </Header>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                </List.Item>
              </List>
            </Item.Description>
            <Item.Extra></Item.Extra>
          </Item.Content>
        </Item>
      } else {
        a[i] = (<Item compact>
          <Item.Header>
            <Header color='orange'> Not Available <Link to='/Insurance'>(Buy Here)</Link></Header>
          </Item.Header>
        </Item>);
      }
    });

    this.setState({
      vehicleList: allVehicle,
      listCar: allVehicle === '' ? null : '',
      eachCar: a
    });
    this.setState({ eachCar: a });

  }

  render() {
    if (this.state.listCar == null) {
      return (
        <Card fluid color='red' header='Loading Please wait.' />
      );
    } else {
      let allVehicle = this.state.vehicleList;

      var result = Object.keys(allVehicle).map(function (key) {
        return [(key), allVehicle[key]];
      });

      //<li key={element[1].vin}>{element[1].UniqueVehicleId}</li>
      console.log(result);

      //this.setState({eachCar : result});

      let count = 0;
      let elements = result.map((element) => {
        console.log('In here');
        count++;

        return (
          <Item>
            <Item.Image size='medium' src={require('../assets/images/' + element[1].MakerName + '.png')} />

            <Item.Content>
              <Item.Header>
                <Header as='h2'>
                  {element[1].MakerName + ' - ' + element[1].model}
                </Header>
              </Item.Header>
              <Item.Meta >
                <Header as='h3'> {element[1].vin}</Header>
                {/*  ◘  style={{ color: element[1].color }}  */}
                <List horizontal divided size='huge'>
                  <List.Item>
                    <List.Content>
                      <List.Header>Color</List.Header>
                      <List.Header>{element[1].color}</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>Body</List.Header>
                      {element[1].TypeofBody}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>Maf. year</List.Header>
                      {new Date(element[1].ManufacturingYear).getFullYear()}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <Modal trigger={<Button icon='plus' content='More Info'/> } >
                        <Modal.Header>{element[1].MakerName + ' - ' + element[1].model}</Modal.Header>
                        <Modal.Content>
                          <Modal.Description>
                            <Header>Engine Number : {element[1].ChasisNumber}</Header>
                            <Header>Chasis Number : {element[1].EngineNumber} </Header>
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                      {/* <Button icon= 'plus' content='More Info' /> */}
                    </List.Content>
                  </List.Item>
                </List>
              </Item.Meta>
              <Item.Description>
              </Item.Description>
              <Item.Extra>
                <Item>
                  <Item.Content>
                    <Item.Header>
                      <Header as='h3'>Insurance Details : </Header>
                    </Item.Header>
                    <Item.Description>
                      {this.state.eachCar[count - 1]}
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Extra>
            </Item.Content>
          </Item>
        )
      });

      if (elements.length === 0)
        elements = (<Card fluid color='red' header='No Registered Cars' /> );

      return (
        <Container style={{ marginLeft: `20px` }}>
          <Item.Group divided>
            {elements}
          </Item.Group>
        </Container>);


    }

  }

}

export default Home;