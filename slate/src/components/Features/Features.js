import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { features } from '../../constants/data';

export default function Features() {
    return (
        <Container className="product-features" fluid itemScope itemType="https://schema.org/FinancialProduct">
            <Row className="mb-4">
                <Col md={12} lg={10} className="title-container">
                    <h2 className="section-title" itemProp="name">
                        Product <strong>Features</strong>
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={11} lg={10} className="m-auto mt-5">
                    <Row className="gx-lg-4">
                        {features.map((feature, index) => {
                            let column = '';
                            if (index % 2 === 0) {
                                column = 'left';
                            } else {
                                column = 'right';
                            }
                            return (
                                <Col xs={10} md={12} lg={6} className="features-section px-lg-3 px-xl-5" key={index} data-animation={`inview-slide-${column}`} itemScope itemType={`https://schema.org/${feature.schema}`}>
                                    <div className={`feature-container-${column}`}>
                                        <div className="d-flex flex-column">
                                            <div className="column-title mb-2">
                                                <h1 className="mb-2" itemProp="name"> 
                                                    <span className="product-title">{feature.title}</span><br></br> 
                                                    <span className="product-subtitle">{feature.subtitle}</span> 
                                                </h1>
                                            </div>
                                        </div>
                                        <div className="d-flex desc-image">
                                            <div className="description" itemProp="description">
                                                <p>{feature.content}</p>
                                            </div>
                                            <div className="image-container">
                                                <img className="feature-image" src={feature.image} alt={`${feature.title} ${feature.subtitle}`}></img>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </Container> 
    )
}