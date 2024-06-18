import React from 'react';
import { Container, Row, Col, Card, Form, Button, Dropdown, DropdownButton } from "react-bootstrap";
const topWave = './images/slate-loan-marketplace-wave.png';


export default function Contact() {
    return (

        <Container className="col-lg-10 col-12 contact-us" fluid>
            <Container className="wave-container m-auto col-lg-10" fluid>
                <div className="inner-container">
                    <div className="wave-background" style={{ backgroundImage: `url(${topWave})` }}></div>

                </div>
            </Container>
            <Row className="pb-5">
                <Col md={10} lg={10} className="title-container">
                    <h2 className="title">
                        Contact <strong>Us</strong>
                    </h2>
                </Col>
                <Col md={8} lg={4} className="m-auto">
                    <Card className="m-auto">
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Enter first name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLastname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Enter last name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Business Email</Form.Label>
                                    <Form.Control size="sm" type="email" placeholder="Enter email address" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control size="sm" type="phone" placeholder="Enter phone number" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formCompany">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Enter company name" />
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex flex-column" controlId="formState">
                                    <Form.Label>State/Region</Form.Label>
                                    <DropdownButton id="state-dropdown-button" title="Enter State / Region">
                                        <Dropdown.Item href="#/action-1">AZ</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">GA</Dropdown.Item>
                                    </DropdownButton>
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex flex-column" controlId="formInterest">
                                    <Form.Label>Reason for interest</Form.Label>
                                    <DropdownButton id="state-dropdown-button" title="Reason for interest">
                                        <Dropdown.Item href="#/action-1">AZ</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">GA</Dropdown.Item>
                                    </DropdownButton>
                                </Form.Group>
                                <div className="d-flex justify-content-end">
                                    <Button size="sm" className="submit-btn btn-filled" variant="" type="submit">
                                        Submit
                                    </Button>
                                </div>

                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}