import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';

class AddCar extends Component {
    state = {
        vehicleId: '',
        chasisNo: '',
        engineNo: '',
        maker: '',
        mafYear: '',
        regNo : '',
        seatCapacity : '',
        bodyType : '',
        vin : '',
        vehicleClass : '',
        loading: false,
        errMsg: ''
    }

    render() {
        return (
            <div style={{ marginLeft:`20px`,marginRight:`20px` }}>
                <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
                    <Form.Group widths='2'>
                        <Form.Field>
                            <Input
                                value={this.state.vehicleId}
                                
                                placeholder='Vehicle ID'
                                onChange={(event) => { this.setState({ vehicleId: event.target.value }) }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                value={this.state.chasis}
                                placeholder='Chasis No'
                                onChange={(event) => { this.setState({ chasis: event.target.value }) }}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='2'>
                        <Form.Field>
                            <Input
                                value={this.state.engineNo}
                                placeholder='Engine No'
                                onChange={(event) => { this.setState({ engineNo: event.target.value }) }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                value={this.state.maker}
                                placeholder='Maker Name'
                                onChange={(event) => { this.setState({ maker: event.target.value }) }}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='2'>
                        <Form.Field>
                            <Input
                                value={this.state.mafYear}
                                placeholder='Manufacturing Year'
                                onChange={(event) => { this.setState({ mafYear: event.target.value }) }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                value={this.state.regNo}
                                placeholder='Registration No'
                                onChange={(event) => { this.setState({ regNo: event.target.value }) }}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='2'>
                        <Form.Field>
                            <Input
                                value={this.state.seatCapacity}
                                placeholder='Seating Capacity'
                                onChange={(event) => { this.setState({ seatCapacity: event.target.value }) }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                value={this.state.bodyType}
                                placeholder='Type of Body'
                                onChange={(event) => { this.setState({ bodyType: event.target.value }) }}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='2'>
                        <Form.Field>
                            <Input
                                value={this.state.vin}
                                placeholder='VIN No'
                                onChange={(event) => { this.setState({ vin: event.target.value }) }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                value={this.state.vehicleClass}
                                placeholder='Vehicle Class'
                                onChange={(event) => { this.setState({ vehicleClass: event.target.value }) }}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Button primary
                        loading={this.state.loading}
                        content="Add"
                    />
                    <Message
                        error
                        header='oops!'
                        content={this.state.errMsg}
                    />

                </Form>
            </div>
        );
    }
}

export default AddCar; 