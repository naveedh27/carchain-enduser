import React, { Component } from 'react';
import { Icon, Container, Grid, Segment, Card, Dimmer, Loader, GridColumn, GridRow, Dropdown, Button, Divider, Message, Statistic, Header, TransitionablePortal } from 'semantic-ui-react';
import axios from 'axios';

var util = require('../util/Util');
var user = util.default.user;
var url = util.default.endpoint;


class Insurance extends Component {


    constructor(props) {
        super(props);

        this.state = {
            allIns: [],
            dd: '',
            DropdownSelected: '',
            loading: false,
            showPopup: false,
            popuMsg: ''
        }

    }

    handleDropDown = (event) => {
        this.setState({ DropdownSelected: event.target.textContent });
    }


    buyInsurance = async (insurance) => {

        var formData = "{" +
            "\"$class\": \"org.acme.carchain.insuranceProvider\"," +
            "\"vin\": \"" + this.state.DropdownSelected + "\"," +
            "\"InsuranceName\": \"" + insurance + "\"" +
            "}";
        var headers = {
            'Content-Type': 'application/json'
        }

        try {

            this.setState({ loading: true });

            let response = await axios.post(url.url + 'insuranceProvider', JSON.parse(formData), headers);

            if (response.status == '200') {
                console.log('success')
                this.setState({ popuMsg: "Insurance Subscribed" });
            } else {
                console.log('failure')
                this.setState({ popuMsg: "Error in Insurance" });
            }

        } catch (error) {
            console.log(error);
            this.setState({ loading: false, showPopup: true, popuMsg: "Error in Insurance" });
        }

        this.setState({ loading: false, showPopup: true });

        setTimeout(this.hideSuccessMsg, 1500);

        user.authenticate();

    }

    async componentDidMount() {

        let allInsurance = this.getAllInsurance();



        let dropDown = [], dd = [];
        if (user.vins.length > 0) {
            (user.vins).forEach((ele) => {
                dropDown.push({ key: ele, text: ele, value: ele });
            });
            dd = dropDown;
            console.log(dd);
            this.setState({ dd });
        }


        allInsurance.then((promiseIns) => {

            let allIns = promiseIns.map((element, i) => {

                return (
                    <Card fluid>
                        <Card.Content header={element.InsuranceName} />
                        <Card.Description>
                            <Message
                                floating
                                info>
                                <Header as='h3'> Duration : {element.InsuranceDuration} </Header>
                                <Header as='h3'> Details : {element.InsuranceType} </Header>
                            </Message>
                        </Card.Description>
                        <Card.Content extra>
                            <Statistic size='tiny'>
                                <Statistic.Value >
                                    <Icon name='rupee sign' size='small' />
                                    {element.InsurancePremium}
                                </Statistic.Value>
                            </Statistic>
                            <Segment>
                                Select Vechicle : <Dropdown
                                    placeholder='Select Car'
                                    selection
                                    onChange={this.handleDropDown}
                                    options={this.state.dd} />
                                <Button
                                    onClick={() => { this.buyInsurance(element.InsuranceName) }}
                                    style={{ marginLeft: `110px` }} primary>
                                    Buy
                                    </Button>
                            </Segment>
                        </Card.Content>
                    </Card>
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

    //setTimeout(this.hideSuccessMsg, 1500);

    hideSuccessMsg = () => {
        this.setState({ showPopup: false });
    }


    render() {
        return (
            <Dimmer.Dimmable as={Container} active={this.state.loading}>
                <TransitionablePortal open={this.state.showPopup}>
                    <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
                        <Header color={this.state.errMsg == true ? 'red' : 'green'}>{this.state.popuMsg}</Header>
                    </Segment>
                </TransitionablePortal>
                <Card.Group itemsPerRow='2'>
                    {this.state.allIns}
                </Card.Group>
                <Dimmer active={this.state.loading}>
                    <Loader size='huge'>Sending Transaction</Loader>
                </Dimmer>
            </Dimmer.Dimmable>
        );
    }
}

export default Insurance; 