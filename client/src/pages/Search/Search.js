import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import { Input, FormBtn } from "../../components/Form";
// import { Card } from "../../components/Card"
import { withRouter } from 'react-router-dom';


class Search extends Component {
  state = {
    stylists: [],
    emailAddress: "",
    username: "",
    password: "",
    stylistId: "",
    address: "",
    month: "",
    day: "",
    year: "",
    clientId: this.props.user._id
  };

  componentDidMount() {
    this.loadStylists();
  }

  loadStylists = () => {
    API.getStylists()
      .then(res =>
        this.setState({ stylists: res.data, emailAddress: "", username: "", password: "" }),
        console.log(this.state.stylists)
        )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state)
  };

  bookAppt = stylistId => {
    // function to add appt info to mongoose
    console.log('CLICKED')
    console.log(this.state, stylistId)
    // this.props.history.push('/calendar')
    const apptInfo = {
      address: this.state.address,
      city: this.state.city,
      zipcode: this.state.zipcode,
      month: this.state.month,
      day: this.state.day,
      year: this.state.year,
      time: this.state.time,
      service: this.state.service,
      clientId: this.state.clientId,
      stylistId: stylistId    
    }
    API.saveAppt(apptInfo).then(res => {
        console.log(res, "This is the response from appointment info");
    });
  };

  // handleFormSubmit = event => {
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          {/*<Col size="md-6">
            <Card title="Search Criteria">
              <form title="searchBox">
              <label htmlFor="serviceType">Hair</label>
                <Input 
                  type="checkbox" 
                  name="serviceType" 
                  value="hair"
                />
              <label htmlFor="serviceType">Makeup</label>
                <Input 
                  type="checkbox" 
                  name="serviceType" 
                  value="makeup"
                />
                <label htmlFor="serviceType">Nails</label>
                <Input 
                  type="checkbox" 
                  name="serviceType" 
                  value="nails" 
                />
                {/* <Input
                  name="minPrice"
                  placeholder="Minimum Price ($)"
                />
                <Input
                  name="maxPrice"
                  placeholder="Maximum Price ($)"
                />
                <Input
                  name="zip"
                  placeholder="Zip Code"
                />
                <FormBtn
                  onClick={this.handleFormSubmit}
                >
                  Search
                </FormBtn>
              </form>
            </Card>  
          </Col>*/}
          <Col size="md-2 sm-12"></Col>
          <Col size="md-8 sm-12">
            <h3>Please select a Stylist to view their profiles and book an appointment.</h3>
            {this.state.stylists.length ? (
                <div className="accordion" id="accordionExample">
                  {this.state.stylists.map( stylist => (
                    <div className="card">
                      <div className="card-header" id="headingOne" style={{backgroundColor:"#c8b7b5"}}>
                        <h5 className="mb-0">
                          <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            {stylist.username}
                          </button>
                        </h5>
                      </div>
                      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="card-body">
                          <h4>{stylist.firstName} {stylist.lastName}</h4>
                          <p>Hair: ${stylist.hair}</p>
                          <p>Makeup: ${stylist.makeup}</p>
                          <p>Nails: ${stylist.nails}</p>
                          <FormBtn data-toggle="modal" data-target="#exampleModal">
                            Book Appointment
                          </FormBtn>

                          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel">Book Appointment</h5>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form>
                                  <label htmlFor="month">Month: </label>
                                  <br></br>
                                  <select name="month" onChange={this.handleInputChange} >
                                    <option name= "month" value="none">Please select Month</option>
                                    <option name= "month" value="1">January</option>
                                    <option name= "month" value="2">February</option>
                                    <option name= "month" value="3">March</option>
                                    <option name= "month" value="4">April</option>
                                    <option name= "month" value="5">May</option>
                                    <option name= "month" value="6">June</option>
                                    <option name= "month" value="7">July</option>
                                    <option name= "month" value="8">August</option>
                                    <option name= "month" value="9">September</option>
                                    <option name= "month" value="10">October</option>
                                    <option name= "month" value="11">November</option>
                                    <option name= "month" value="12">December</option>
                                  </select>
                                  <br></br>
                                  <label htmlFor="day">Day: </label>
                                  <br></br>
                                   <select name="day" onChange={this.handleInputChange} >
                                    <option name= "day" value="none">Please select Day</option>
                                    <option name= "day" value="1">1</option>
                                    <option name= "day" value="2">2</option>
                                    <option name= "day" value="3">3</option>
                                    <option name= "day" value="4">4</option>
                                    <option name= "day" value="5">5</option>
                                    <option name= "day" value="6">6</option>
                                    <option name= "day" value="7">7</option>
                                    <option name= "day" value="8">8</option>
                                    <option name= "day" value="9">9</option>
                                    <option name= "day" value="10">10</option>
                                    <option name= "day" value="11">11</option>
                                    <option name= "day" value="12">12</option>
                                    <option name= "day" value="13">13</option>
                                    <option name= "day" value="14">14</option>
                                    <option name= "day" value="15">15</option>
                                    <option name= "day" value="16">16</option>
                                    <option name= "day" value="17">17</option>
                                    <option name= "day" value="18">18</option>
                                    <option name= "day" value="19">19</option>
                                    <option name= "day" value="20">20</option>
                                    <option name= "day" value="21">21</option>
                                    <option name= "day" value="22">22</option>
                                    <option name= "day" value="23">23</option>
                                    <option name= "day" value="24">24</option>
                                    <option name= "day" value="25">25</option>
                                    <option name= "day" value="26">26</option>
                                    <option name= "day" value="27">27</option>
                                    <option name= "day" value="28">28</option>
                                    <option name= "day" value="29">29</option>
                                    <option name= "day" value="30">30</option>
                                    <option name= "day" value="31">31</option>
                                  </select>
                                  <br></br>
                                  <label htmlFor="year">Year: </label>
                                  <br></br>
                                  <select name="year" onChange={this.handleInputChange} >
                                    <option name= "year" value="none">Please select Year</option>
                                    <option name= "year" value="2018">2018</option>
                                    <option name= "year" value="2019">2019</option>
                                    <option name= "year" value="2020">2020</option>
                                    <option name= "year" value="2021">2021</option>
                                    <option name= "year" value="2022">2022</option>
                                    <option name= "year" value="2023">2023</option>
                                    <option name= "year" value="2024">2024</option>
                                    <option name= "year" value="2025">2025</option>
                                    <option name= "year" value="2026">2026</option>
                                    <option name= "year" value="2027">2027</option>
                                    <option name= "year" value="2028">2028</option>
                                  </select>
                                  <br></br>
                                  <label htmlFor="Time">Time: </label>
                                  <Input
                                    type="time"
                                    name="time"
                                    onChange={this.handleInputChange}
                                    placeholder= "Time"
                                  />
                                  <label htmlFor="service">Service Requested: </label>
                                  <Input
                                    type="text"
                                    name="service"
                                    placeholder="e.g. Hair, Makeup, Nails"
                                    onChange={this.handleInputChange}
                                  />
                                  <label htmlFor="address">Address: </label>
                                  <Input
                                    type="text"
                                    name="address"
                                    placeholder="address"
                                    onChange={this.handleInputChange}
                                  />
                                  <label htmlFor="city">City: </label>
                                  <Input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    onChange={this.handleInputChange}
                                  />
                                  <label htmlFor="zipcode">Zip Code: </label>
                                  <Input
                                    type="text"
                                    name="zipcode"
                                    placeholder="Zip Code"
                                    onChange={this.handleInputChange}
                                  />
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                  <FormBtn data-dismiss="modal" onClick={() => this.bookAppt(stylist._id)}>Schedule</FormBtn>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>               
                  
                  ))}
                </div>
            ) : (
              <h3>No Stylists Found - please try again.</h3>
            )}
          </Col>
          <Col size="md-2 sm-12"></Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Search);
