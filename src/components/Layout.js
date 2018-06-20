
import React from 'react';
import {Header,  Container } from 'semantic-ui-react'


export default (props) => {

    return (
        <Container>
            <Header as='h1' icon textAlign='center'>
                {/* <Icon name='car' /> */}
                <Header.Content> Car Chain - End User</Header.Content>
            </Header>
            {props.children}
        </Container>
    );

}
