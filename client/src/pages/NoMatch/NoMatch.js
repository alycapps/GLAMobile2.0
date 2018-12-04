import React from "react";
import { Col, Row, Container } from "../../components/Grid";

const NoMatch = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
      <br></br>
        <h1 style={{color:"red", textAlign: "center"}}>404 Page Not Found</h1>
      </Col>
    </Row>
    <Row>
      <Col size="md-12">
        <div>
          <img style={{width:"100%"}} src="./images/person.jpg" alt="well this is awkward"></img>
        </div>
      </Col>
    </Row>
    <br></br>

  </Container>
);

export default NoMatch;
