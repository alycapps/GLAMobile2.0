import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import {Card} from "../../components/Card";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from '../../components/Form';
import Calendar from "../../components/Calendar"
import ReactDOM from "react-dom";

class Client extends Component {
  state = {
    stylists: [],
    appointments: [],
    client: this.props.user,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    emailAddress: this.props.user.emailAddress,
    username: this.props.user.username,
    currentMonth: new Date(),
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

  myApptLoad = () => {
    for (let i=0; i<this.state.appointments.length; i++) {
      if (this.state.appointments[i].month == (this.state.currentMonth.getMonth() + 1) ) {
      
      }
    }
  }
  
  addtoCalendar = () => {
    console.log(this.state.appointments)
    for (const s of document.querySelectorAll(".number")) {
      for (var i = 0; i < this.state.appointments.length; i++) {
        if (this.state.appointments[i].clientId == this.state.client._id){
          if (this.state.appointments[i].month == (this.state.currentMonth.getMonth() + 1) ) {  
            if (s.textContent.includes(this.state.appointments[i].day)) {
              console.log("appt on day " + s.textContent)
              let a = document.createElement("span");
              a.innerHTML = this.state.appointments[i].time + " " + this.state.appointments[i].service + "<br />";
              let e = ReactDOM.findDOMNode(s).parentNode;            
              e.insertBefore(a,s);
            }
          }
        }
      }
    }
  };

  editProfile = id => {
    let data = {
      '_id': id,
      'firstName': this.state.firstName,
      'lastName': this.state.lastName,
      'username': this.state.username,
      'emailAddress':this.state.emailAddress
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
    console.log(this.state);
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-7">
            <form>
              <h3>Upcoming Appointments</h3>
              {this.state.appointments.length ? (
              <List>
                {this.state.appointments.map(appointment => (
                  <ListItem key={appointment._id}>
                    <p>{appointment.service} on {appointment.month}/{appointment.day}/{appointment.year} at {appointment.time}</p>
                    <p>{appointment.address}, {appointment.city} {appointment.zipcode}
                    <DeleteBtn onClick={() => this.deleteAppt(appointment._id)} />
                    </p> 
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Appointments Scheduled</h3>
            )}
              <Link to="/search">
                <FormBtn>
                  Book a New Appointment
                </FormBtn>
              </Link>
            </form>
          </Col>
          <Col size="md-5 sm-12">
          <div>
            <Card title="My Profile">
              First Name: {this.state.firstName ? 
                (this.state.firstName): 
                (<span style={{color:"red"}}>Unknown -- Please Add</span>)}
              <br></br>
              Last Name: {this.state.lastName ? 
                (this.state.lastName): 
                (<span style={{color:"red"}}>Unknown -- Please Add</span>)}
              <br></br>
              Username: {this.state.username ? 
              (this.state.username): 
              (<span style={{color:"red"}}>Unknown -- Please Add</span>)}
              <br></br>
              Email: {this.state.emailAddress ? 
                (this.state.emailAddress): 
                (<span style={{color:"red"}}>Unknown -- Please Add</span>)}
              <br></br>
              <FormBtn data-toggle="modal" data-target="#exampleModal">
                Edit Profile
              </FormBtn>
              </Card>
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
                      placeholder= {this.state.client.firstName}
                    />
                    <label htmlFor="lastName">Last Name: </label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder={this.state.client.lastName}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="username">Username: </label>
                    <Input
                      type="text"
                      name="username"
                      placeholder={this.state.client.username}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="emailAddress">Email: </label>
                    <Input
                      type="text"
                      name="emailAddress"
                      placeholder={this.state.client.emailAddress}
                      onChange={this.handleInputChange}
                    />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <FormBtn data-dismiss="modal" onClick={() => this.editProfile(this.state.client._id)}>Save changes</FormBtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Col>
        </Row>
        <br></br>
        <Card title="Upcoming Appointments">
          <Calendar />
        </Card>
        <br></br>
      </Container>
    );
  }
}

export default Client;
