import React, { Component } from 'react';
import { Card, Segment, Grid, Item, Table, Container, Header, Label, Icon, Divider } from 'semantic-ui-react'
import axios from 'axios';

var util = require('../util/Util');
var user = util.default.user;
var url = util.default.endpoint;

console.log(url);

class ListCar extends Component {

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
                a[i] = <Segment>
                    <Item>
                        <Item.Content>
                            <Item.Header>
                                <Header color='blue' as='h2'>{reqData[0].InsuranceName}</Header>
                            </Item.Header>
                            <Item.Meta></Item.Meta>
                            <Item.Description>
                                Insurance ID :
                                <Header as='h5'>
                                    {reqData[0].CurrentInsuranceNumber}
                                </Header>
                                Insurance Duration :
                                <Header as='h5'>
                                    {reqData[0].InsuranceDuration}
                                </Header>
                                Insurance Expiry :
                                <Header as='h5'>
                                    {new Date(reqData[0].CurrentInsuranceExpiry).toLocaleDateString()}
                                </Header>
                            </Item.Description>
                            <Item.Extra></Item.Extra>
                        </Item.Content>
                    </Item>
                </Segment>
            } else {
                a[i] = <Segment><Header color='red' as='h5'>Not Available</Header></Segment>;
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
                    <Segment key={element[1].vin} >
                        <Item>
                            <Item.Content>
                                <Item.Header>
                                    <Header color='olive' as='h2'><strong>{element[1].MakerName + ' - ' + element[1].model}</strong></Header>
                                </Item.Header>
                                <Table compact>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Registration Number  </Table.Cell>
                                            <Table.Cell>
                                                <Header as='h3'>
                                                    {element[1].vin}
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>Vehicle Class  </Table.Cell>
                                            <Table.Cell>
                                                <Header as='h3'>
                                                    {element[1].VehicleClass}
                                                </Header>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Color </Table.Cell>
                                            <Table.Cell>
                                                <Header as='h3'>
                                                    {element[1].color}
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>Seating Capacity  </Table.Cell>
                                            <Table.Cell>
                                                <Header as='h3'>
                                                    {element[1].SeatingCapacity}
                                                </Header></Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell>Chasis Number </Table.Cell>
                                            <Table.Cell>{element[1].ChasisNumber}</Table.Cell>
                                            <Table.Cell>Engine Number  </Table.Cell>
                                            <Table.Cell>{element[1].EngineNumber}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell>Manufactured Year</Table.Cell>
                                            <Table.Cell>{new Date(element[1].ManufacturingYear).getFullYear()}</Table.Cell>
                                            <Table.Cell>First Purchase Date  </Table.Cell>
                                            <Table.Cell>{new Date(element[1].purchaseDate).toLocaleDateString()}</Table.Cell>
                                        </Table.Row>

                                    </Table.Body>
                                </Table>
                                <Item.Description>
                                    <Item>
                                        <Item.Content>
                                            <Item.Header>
                                                <Header color='teal' as='h3'>Insurance Details : </Header>
                                            </Item.Header>
                                            <Item.Description>
                                                {this.state.eachCar[count - 1]}
                                            </Item.Description>
                                        </Item.Content>
                                    </Item>
                                </Item.Description>

                            </Item.Content>

                        </Item>

                    </Segment>);
            });

            if (elements.length === 0)
                elements = <Card fluid color='red' header='No Registered Cars' />;

            return (<Container style={{ marginLeft: `20px` }}>
                {elements}
            </Container>);


        }

    }

}

export default ListCar;