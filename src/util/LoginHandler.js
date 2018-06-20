import React, { Component } from 'react';
import { Form, Button, Segment, Container, Message, Dimmer, Loader, TransitionablePortal, Header } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

var util = require('./Util');
var user = util.default.user;

class LoginHandler extends Component {

    state = {
        redirectToReferrer: false,
        userName: '',
        loading: false,
        showPopup: false,
        popuMsg: ''
    }

    login = async () => {
        this.setState({ loading: true });

        let status = await user.authenticate(this.state.userName);
        if (status === true) {
            this.setState({  popuMsg: 'Success',showPopup:true });
        } else {
            this.setState({ popuMsg: 'Failed',showPopup:true })
        }

        setTimeout(this.hideSuccessMsg, 1500);

        this.setState({ loading: false,redirectToReferrer: true });
    }



    hideSuccessMsg = () => {
        this.setState({ showPopup: false });
    }



    handleChange(event) {
        this.setState({ userName: event.target.value })
    }


    render() {
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            return <Redirect to='/' />
        }

        return (
            <Container>
                <Segment >
                    <Form error={this.state.error}>
                        <Dimmer active={this.state.loading}>
                            <Loader size='huge'>Logging in</Loader>
                        </Dimmer>
                        <TransitionablePortal open={this.state.showPopup}>
                            <Segment inverted style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
                                <Header>{this.state.popuMsg}</Header>
                            </Segment>
                        </TransitionablePortal>
                        <Form.Field>
                            <label>User Name</label>
                            <input
                                value={this.state.userName}
                                onChange={this.handleChange.bind(this)}
                                placeholder='User Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input type='Password' placeholder='Password' />
                        </Form.Field>
                        <Button primary
                            onClick={() => this.login(this.state.userName)}>Submit</Button>
                        <Message
                            error
                            header='Action Forbidden'
                            content='Incorrect User Name or Password'
                        />
                    </Form>
                </Segment>
            </Container>

        );
    }
}

export default LoginHandler; 