// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import EmployeeData from "./component/EmployeeData";
import Footer from "./component/Footer"; // Import the Footer component
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Container fluid className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/employee-data" element={<EmployeeData />} />
        </Routes>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
