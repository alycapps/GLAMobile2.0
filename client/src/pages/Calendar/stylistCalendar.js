import React from "react";
import dateFns from "date-fns";
import { Card } from '../../components/Card';
// import { ClientResponse } from "http";
import DeleteBtn from "../../components/DeleteBtn";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
// import { Input, FormBtn } from "../../components/Form";
import "./stylistCalendar.css";
import ReactDOM from "react-dom";

// const clients = [ { date: 14, name: "Hardin" } ]
class Calendar extends React.Component {
  state = {
    stylist: this.props.user,
    appointments: [],
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  componentDidMount() {
    this.loadAppts();
    console.log(this.state.currentMonth.getMonth());
    console.log("state")
  };

  loadAppts = () => {
    API.getAppts()
      .then(res =>
        this.setState(
          { 
            appointments: res.data 
          }, 
          this.addtoCalendar
        )
      )
      .catch(err => console.log(err));
  };

  addtoCalendar = () => {
    console.log(this.state.appointments)
    for (const s of document.querySelectorAll(".number")) {
      for (var i = 0; i < this.state.appointments.length; i++) {
        if (this.state.appointments[i].stylistId == this.state.stylist._id){
          if (this.state.appointments[i].month == (this.state.currentMonth.getMonth() + 1) ) {
            if (s.textContent.includes(this.state.appointments[i].day)) {
              console.log("appt on day " + s.textContent)
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

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <div className="calendar">
            <Card title="Calendar">
              {this.renderHeader()}
              {this.renderDays()}
              {this.renderCells()}
            </Card>
          </div>
        </Row>
        <br></br>
        <Row>
          <Col size="md-12">
            <Card title="Upcoming Appointments">
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
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Calendar;
