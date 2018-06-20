import React, { Component } from 'react';
import { Icon, Container, Grid, Segment, Card, GridColumn, GridRow, Button, Divider, Message, Statistic, Header } from 'semantic-ui-react';
import axios from 'axios';

var util = require('../util/Util');
var user = util.default.user;
var url = util.default.endpoint;


class Insurance extends Component {


    constructor(props) {
        super();

        console.log(props.carvin);

        this.state = {
            allIns: []
        }

    }

    async componentDidMount() {

        let allInsurance = this.getAllInsurance();

        allInsurance.then((promiseIns) => {

            let allIns = promiseIns.map((element, i) => {

                return (
                    <GridRow key={i}>
                        <GridColumn>
                            <Card fluid color='orange'>
                                <Card.Content header={element.InsuranceName} />
                                <Card.Description style={{ marginLeft: `16px` }}>
                                    <Header as='h3'> Duration : {element.InsuranceDuration} </Header>
                                    <Message
                                        header='Details'
                                        content={element.InsuranceType}
                                    />
                                </Card.Description>
                                <Card.Content extra>
                                    <Statistic size='tiny'>
                                        <Statistic.Value >
                                            <Icon name='rupee sign' size='tiny' />
                                            {element.InsurancePremium}
                                        </Statistic.Value>
                                    </Statistic>
                                    <Button
                                        data={element.InsuranceName}
                                        style={{ marginLeft: `110px` }} primary>
                                        Buy
                                    </Button>
                                </Card.Content>
                            </Card>
                        </GridColumn>
                    </GridRow>
                );

            });

            this.setState({
                allIns
            });

            console.log(allIns);
        }).catch((error) => {
            console.log(error);
        });
    }


    getAllInsurance = async () => {
        try {
            let resp = await axios.get(url.url + 'InsuranceMarketPlace');
            return resp.data;
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        return (
            // <Card.Group fluid>
            //     
            // </Card.Group>
            <Grid>
                {this.state.allIns}
            </Grid>
        );
    }
}

export default Insurance; 