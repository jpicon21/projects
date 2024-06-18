import React, {useState, useEffect} from "react";
import { Navbar, Nav, Container, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const logo = "./images/slate-digital-asset-finance.svg";

export default function Header() {
  const [ scrolled, setScrolled ] = useState('');

  const handleScroll = () => {
    if (window.pageYOffset > 1) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);

  return (
      <Navbar className={`header ${scrolled ? 'blur' : ''}`} sticky="top">
        <Container className="header-container col-lg-10" fluid>
          <Col className="header-logo" sm={4} md={8}>
          <LinkContainer to="/">
            <img className="logo" src={logo} alt="company logo" />
            </LinkContainer>
          </Col>
          <Col className="header-links flex-wrap" lg={4}>
          <LinkContainer to="/contact">
            <Nav.Link className="btn-outlined" href="#contactus">
              Contact Us
              </Nav.Link>
              </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="btn-link login" href="#login">
              Login
            </Nav.Link>
            </LinkContainer>
          </Col>
        </Container>
      </Navbar>
  );
}
