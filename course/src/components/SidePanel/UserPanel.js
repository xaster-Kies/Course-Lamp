import React, { Component } from 'react'
import firebase from '../../Firebase'
import { connect } from 'react-redux'
import { Dropdown, Grid, Header, Icon } from 'semantic-ui-react'

 class UserPanel extends Component {

    state = {
        user = null
    }

    componenetDidMount() {
        this.setState({ user: this.props.currentUser})
    }

    dropdownOptions = () => [
        {
            key: "user",
            text: <span>Signed in as <strong>{this.state.user && this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignout}>Sign Out</span>
        }
    ];

    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log('Signed out!'))
    }

    render() {
        
        return (
            <Grid style = {{ background: '#4c3c4c'}}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '0.7em', margin:0 }}>
                        <Header inverted floated="left" as="h2">
                            <Icon name="lightbulb outline"/>
                            <Header.Content>CourseLamp</Header.Content>
                        </Header>
                    </Grid.Row>

                    <Header style={{ padding: '0.25em' }} as="h4" inverted>
                        <Dropdown trigger={
                            <span>User</span>
                        } options={this.dropdownOptions()}/>
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}
 const mapStateToProps = state => ({
     currentUser: state.user.current
 })

export default connect(mapStateToProps)(UserPanel);

