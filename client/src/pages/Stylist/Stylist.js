import React, { Component } from "react";
import {Card} from "../../components/Card";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import { Input, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";

class Stylist extends Component {
  state = {
    stylist: this.props.user,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    username: this.props.user.username,
    emailAddress: this.props.user.emailAddress,
    // city: this.props.user.city,
    // zipcode: this.props.user.zipcode,
    licNum: this.props.user.licNum,
    hair: this.props.user.hair,
    nails: this.props.user.nails,
    makeup: this.props.user.makeup,
    appointments: []
  };

  componentDidMount() {
    this.loadAppts();
  };

  loadAppts = () => {
    API.getAppts()
      .then(res =>
        this.setState({ appointments: res.data },
          this.addtoCalendar)
        )
      .catch(err => console.log(err));
  };

  deleteAppt = id => {
    API.deleteAppt(id)
      .then(res => this.loadAppts())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  editPricing = id => {
    let data = {
      '_id': id,
      'hair': this.state.hair,
      'makeup': this.state.makeup,
      'nails': this.state.nails
    }
    API.updateUser(id, data)
    .then(
      res => console.log(res),
      console.log("res"),
      console.log(this.state.hair),
      console.log(this.state.makeup),
      console.log(this.state.nails)
    ).catch(err => console.log(err));
  };
  
  editProfile = id => {
    let data = {
      '_id': id,
      'firstName': this.state.firstName,
      'lastName': this.state.lastName,
      'username': this.state.username,
      'emailAddress':this.state.emailAddress,
      'licNum': this.state.licNum
    }
    API.updateUser(id, data)
    .then(
      res => console.log(res),
      console.log("res"),
      console.log(this.state.client),
      console.log("user")
    )
    .catch(err => console.log(err));
  };

  editPricing = id => {
    let data = {
      '_id': id,
      'hair': this.state.hair,
      'makeup': this.state.makeup,
      'nails':this.state.nails
    }
    API.updateRates(id, data)
    .then(
      res => console.log(res),
      console.log("res"),
      console.log(this.state.client),
      console.log("user")
    )
    .catch(err => console.log(err));
  };

  render() {
      return(
      <Container>
        <Row>
          <Col size="md-3"></Col>
          <Col size="md-6">
            <Card>
              <Link to="/Calendar">
                <button>
                  View My Scheduled Appointments
                </button>
              </Link>
            </Card>
          </Col>
          <Col size="md-3"></Col>
          <br/>
        </Row>
        <br></br>

        <Row>
          <div className="row">  
            <Col size="md-6">
              <Card title="Service Pricing">
                    Hair: {this.state.hair ? 
                      ("$" + this.state.hair): 
                      (<span style={{color:"red"}}>$0.00</span>)}
                    <br></br>
                    Nails: {this.state.nails ? 
                      ("$" + this.state.nails): 
                      (<span style={{color:"red"}}>$0.00</span>)}
                    <br></br>
                    Makeup: {this.state.makeup ? 
                      ("$" + this.state.makeup): 
                      (<span style={{color:"red"}}>$0.00</span>)}
                    <br></br>
    
                    <FormBtn data-toggle="modal" data-target="#editPricing">
                    Edit Pricing
                     </FormBtn>

                  <div className="modal fade" id="editPricing" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Pricing</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                        <label htmlFor="hair">Hair: </label>
                        <Input
                          type="number"
                          name="hair"
                          onChange={this.handleInputChange}
                          placeholder= {this.state.hair}
                        />
                        <label htmlFor="makeup">Makeup: </label>
                        <Input
                          type="number"
                          name="makeup"
                          placeholder={this.state.makeup}
                          onChange={this.handleInputChange}
                        />
                        <label htmlFor="nails">Nails: </label>
                        <Input
                          type="number"
                          name="nails"
                          placeholder={this.state.nails}
                          onChange={this.handleInputChange}
                        />
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <FormBtn data-dismiss="modal" onClick={() => this.editPricing(this.state.stylist._id)}>Save changes</FormBtn>
                      </div>
                    </div>
                  </div>
                </div>

              </Card>
            </Col>
           {/* End of Pricing info/modal */}

           {/*Stylist info/modal */}
            <Col size="md-6">
              <Card title="My Information">
                First Name: {this.state.firstName ? 
                  (this.state.firstName): 
                  (<span style={{color:"red"}}>Please Add</span>)}
                <br></br>
                Last Name: {this.state.lastName ? 
                  (this.state.lastName): 
                  (<span style={{color:"red"}}>Please Add</span>)}
                <br></br>
                Username: {this.state.username ? 
                  (this.state.username): 
                  (<span style={{color:"red"}}>Please Add</span>)}
                <br></br>
                Email: {this.state.emailAddress ? 
                  (this.state.emailAddress): 
                  (<span style={{color:"red"}}>Please Add</span>)}
                <br></br>
                License Number: {this.state.licNum ? 
                  (this.state.licNum): 
                  (<span style={{color:"red"}}>Please Add</span>)}
                <br></br>
                <FormBtn data-toggle="modal" data-target="#exampleModal">
                  Edit Profile
                </FormBtn>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">My Profile</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                        <label htmlFor="firstName">First Name: </label>
                        <Input
                          type="text"
                          name="firstName"
                          onChange={this.handleInputChange}
                          placeholder= {this.state.stylist.firstName}
                        />
                        <label htmlFor="lastName">Last Name: </label>
                        <Input
                          type="text"
                          name="lastName"
                          placeholder={this.state.stylist.lastName}
                          onChange={this.handleInputChange}
                        />
                        <label htmlFor="username">Username: </label>
                        <Input
                          type="text"
                          name="username"
                          placeholder={this.state.stylist.username}
                          onChange={this.handleInputChange}
                        />
                        <label htmlFor="emailAddress">Email: </label>
                        <Input
                          type="text"
                          name="emailAddress"
                          placeholder={this.state.stylist.emailAddress}
                          onChange={this.handleInputChange}
                        />
                        <label htmlFor="licNum">License Number: </label>
                        <Input
                          type="text"
                          name="licNum"
                          placeholder={this.state.stylist.licNum}
                          onChange={this.handleInputChange}
                        />
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <FormBtn data-dismiss="modal" onClick={() => this.editProfile(this.state.stylist._id)}>Save changes</FormBtn>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>  
          </div>
        </Row>
        <br></br>
        
      </Container> 
    );
  }
}

export default Stylist;