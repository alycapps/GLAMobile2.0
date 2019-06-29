import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import "./login.css";

class LoginForm extends Component {
  
  constructor() {
    super();
    
		this.state = {
			username: '',
      password: '',
      emailAddress: '',
      redirectTo: null,
      alertMessage: ''
		};
  }
  
  // function that changes the state based on the name of whatever field is being edited
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

  // function to handle when user clicks signin
	handleSubmit = (event) => {
		event.preventDefault();
		console.log('handleSubmit');
		this.props.login(this.state.username, this.state.password);
    if (this.state.password && this.state.emailAddress) {
      this.setState({
        redirectTo: '/'
      });
    }
    else {
      this.setState({alertMessage: "Please enter all fields"})
    }
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<Container className="loginPage">
          <Row>
            <Col size="md-5">
              <Card title="Login to GLAMobile">

                {/* Alert message if error with login */}
                {this.state.alertMessage.length ? (
                    <h4 style={{color:"red"}}>{this.state.alertMessage}</h4>
                  ) : (
                    ""
                )}

                <form style={{marginTop: 10}}>
                  <label htmlFor="username">Username: </label>
                  <Input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
									<label htmlFor="emailAddress">Email: </label>
									<Input
                    type="text"
                    name="emailAddress"
                    value={this.state.emailAddress}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="password">Password: </label>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <Link to="/signup">Register</Link>
                  <FormBtn onClick={this.handleSubmit}>Login</FormBtn>
                </form>
              </Card>
            </Col>
            <Col size="md-7"></Col>
          </Row>
				</Container>
			)
		}
	}
}

export default LoginForm;
