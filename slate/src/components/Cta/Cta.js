import React from 'react';
import { Container, Row, Button } from "react-bootstrap";

const wave = './images/cta-slate-loan-marketplace-wave.png';

export default function Cta() {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
    };

    return (
        <Container className="cta-container" fluid style={{ backgroundImage: `url(${wave})` }}>
            <div className="inner-cta-wrapper col-11 col-lg-10 m-auto">
                <Row className="heading-wrapper">
                    <h2 className="section-title">Want to learn more about our innovative <strong>Whole Loan Participation solutions?</strong>
                    </h2>
                </Row>
                <Row className="cta-content">
                    <p>Request information on SLATE's streamlined technological solutions for it's Originators and Investors?</p>
                </Row>
                <Button href="/contact" className="btn-filled">Request Demo</Button>
                <Button onClick={scrollToTop} className="btn-top">
                    Back to top
                </Button>
            </div>
        </Container>
    )
}