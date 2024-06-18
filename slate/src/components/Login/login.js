import React from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const topWave = './images/slate-loan-marketplace-wave.png';


export default function Login() {
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
                        Sign Into <br></br> <strong>Slate</strong>
                    </h2>
                </Col>
                <Col md={8} lg={5} className="m-auto">
                    <Card className="m-auto">
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email address or SLATE ID</Form.Label>
                                    <Form.Control size="sm" type="email" placeholder="Enter email address" />
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex flex-column" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control size="sm" type="password" placeholder="Enter password" />
                                    <a href="#" className="align-self-end mt-2"> <span>Forgot Password?</span> </a>
                                </Form.Group>
                                <div className="d-flex justify-content-end">
                                    <Button size="sm" className="submit-btn btn-filled" variant="" type="submit">
                                        Log In
                                    </Button>
                                </div>
                                <Form.Group className="mt-5 mb-5">
                                    <div className="d-flex">
                                        <Form.Check
                                        inline
                                        label="Add this browser to trusted device"
                                        name=""
                                        type="checkbox"
                                        />
                                     </div>
                                </Form.Group>


                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}