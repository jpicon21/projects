import React from 'react';
import { Container, Col, Row } from "react-bootstrap";

const freedom = './images/our-partners/freedom-logo.svg';
const affirm = './images/our-partners/Affirm-logo.svg';

export default function Partners() {
    return (
        <Container className="section-partners" fluid>
            <div className="container-fluid">
                <Row className="title-row">
                    <Col className="title-container m-auto" lg={10}>
                        <h2 className="section-title">
                            Our <strong>Partners</strong>
                        </h2>
                    </Col>
                </Row>
                <Row className="d-flex px-5 logos-container container mx-auto">
                    <Col xs={12} sm={6} className="logo-col p-5">
                        <img src={freedom} alt="freedom logo" />
                    </Col>
                    <Col xs={12} sm={6} className="logo-col p-5">
                        <img src={affirm} alt="affirm logo" />
                    </Col>
                </Row>
            </div>
        </Container>
    )
}