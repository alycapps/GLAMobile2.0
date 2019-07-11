import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { Card } from "../../components/Card"
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    clientId: this.props.user._id,
    date: new Date()
  };

  componentDidMount() {
    this.loadStylists();
  }

  loadStylists = () => {
    API.getStylists()
      .then(res =>
        this.setState({ stylists: res.data },
          this.clearStylistsNoData)
      )
      .catch(err => console.log(err));
  };

  // function to remove any stylists that do not have a firstName or lastName
  clearStylistsNoData = () => {
    let stylistWithData=[]
    this.state.stylists.map(stylist => {
      if( stylist.firstName && stylist.lastName) {
        stylistWithData.push(stylist)
      }
    })
    this.setState({ stylists: stylistWithData })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state)
  };

  // only for datepicker field - does the same as above funciton need to fix
  handleChange = date => {
    this.setState({
      date: date
    });
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
      // time: this.state.time,
      service: this.state.service,
      clientId: this.state.clientId,
      stylistId: stylistId,
      date: new Date()    
    }
    API.saveAppt(apptInfo).then(res => {
        console.log(res, "This is the response from appointment info");
    });
  };

  // function that filters based on dropdown based on chosen value
  filter = (event) => {
    let filterVal = event.target.value;
    let newStylists = this.state.stylists;
    newStylists.sort(this.dynamicSort(filterVal))
    this.setState({ stylists: newStylists})
  };

  // alphabetizes the newStylists by chosen filter 
  dynamicSort = (property) => {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        if(sortOrder === -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
  };
  


  render() {
    return (
      <Container fluid>
        <Row>
          {/* Col for search box */}
          <Col size="md-4">   
            <br />
            <Card title="Filter Search Results:">
              <select name="filter" onChange={this.filter} >
                <option name= "filter" value="none">Filter By:</option>
                <option name= "filter" value="firstName">Stylist First Name</option>
                <option name= "filter" value="lastName">Stylist Last Name</option>
              </select>

              {/* <form title="searchBox">
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
                <Input
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
              </form> */}

            </Card>  
          </Col>

          {/* Col for stylists results */}
          <Col size="md-8 sm-8">
            <h3>Please select a Stylist to view their profiles and book an appointment.</h3>
            {this.state.stylists.length ? (
                <div className="accordion" id="accordionExample" >
                  {this.state.stylists.map( stylist => (
                    <div key={stylist._id} className="card" style={{backgroundColor: 'rgba(255,255,255,0.95)'}}>
                      <div className="card-header" id="headingOne" style={{backgroundColor:"#c8b7b5"}}>
                        <h5 className="mb-0">
                          <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{color:"black"}}>
                            {stylist.firstName} {stylist.lastName}
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

                                  <label htmlFor="date">Date: </label>
                                  <br/>
                                  <DatePicker
                                    selected={this.state.date}
                                    onChange={this.handleChange}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    timeCaption="time"
                                    minDate={new Date()}
                                  >
                                    {/* <div style={{color: 'red'}}>
                                      Appointments must be 24 hours out
                                    </div> */}
                                  </DatePicker>
                                  
                                  <br/><br/>


                                  {/* <label htmlFor="Time">Time: </label>
                                  <Input
                                    type="time"
                                    name="time"
                                    onChange={this.handleInputChange}
                                    placeholder= "Time"
                                  /> */}
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
        </Row>
      </Container>
    );
  }
}

export default withRouter(Search);
