import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import AUTH from '../../utils/AUTH';
import "./login.css";

class SignupForm extends Component {

	constructor() {
    super();
    
		this.state = {
      username: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      userType: '',
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
  
  // function to handle when user clicks register
	handleSubmit = (event) => {
		event.preventDefault();
    // TODO - validate!
    console.log(this.state)
    if (this.state.password && this.state.emailAddress && this.state.userType) {
      AUTH.signup({
        username: this.state.username,
        password: this.state.password,
        emailAddress: this.state.emailAddress,
        userType: this.state.userType
      }).then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log('youre good');
          this.setState({
            redirectTo: '/'
          });
        } else {
          console.log('duplicate');
          console.log(response.data.errmsg)
          this.setState({alertMessage: "There was an error registering, please try again"})
        }
      });
    }
    else {
      // alert("Please enter all fields")
      this.setState({alertMessage: "Please enter all fields"})
    }
		
  }
  
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    
		return (
      <Container>
        <Row>
          <Col size="md-5">
            <Card title="Register for GLAMoblie">

              {/* Alert message if error in registration */}
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
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
                <label htmlFor="userType">Profile Type: </label>
                <br></br>
                <select name="userType" onChange={this.handleChange} >
                  <option name= "userType" value="none">Please select profile type.</option>
                  <option name= "userType" value="client">Client</option>
                  <option name= "userType" value="stylist">Stylist</option>
                </select>
                <br></br>
                <Link to="/">Login</Link>
                <FormBtn onClick={this.handleSubmit}>Register</FormBtn>
              </form>
            </Card>
          </Col>
          <Col size="md-7"></Col>
        </Row>
      </Container>
		)
	}
}

export default SignupForm;