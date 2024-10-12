import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white w-20 mt-auto px-0 mx-0 py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">MERN CRUD Project Showcase by <strong>Abhishek Mahara</strong></p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
