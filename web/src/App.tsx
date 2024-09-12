import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Table, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Menu } from './components/menu';
import { BookLoanList } from './components/book-loan-list';

function App() {
  return (
    <>
     <Menu/>

      <Container className="mt-3">
        <Row>
          <Col>
            <BookLoanList/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
