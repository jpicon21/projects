import React from 'react';
import { statsData } from '../../constants/data';
import CountUp from 'react-countup';
import { Row, Col } from "react-bootstrap";
import { useInView } from 'react-intersection-observer';

export default function Stats() {
    const [ref, inView] = useInView({
        threshold: 0
    });

    return (
        <div className="stats-container" itemScope itemType="https://schema.org/FinancialProduct">  
            <Row className="columns-container gx-3 gy-3" data-animation="inview-cascade-fade-up">
                {statsData.map((stat, index) => {
                    return (
                        <Col className="stat-col" key={index} md={6} xxl={3}>
                            <div className={`stat-box box-${index}`}>
                                {stat.title ? (
                                    <div className="inner-box">
                                        <h3 className="intro-title" itemProp="name">{stat.title} <br/>
                                        {stat.subtitle}</h3>
                                        <p className="intro-content" itemProp="description">{stat.content}</p>
                                    </div>
                                    ) : (
                                    <div className="inner-box" ref={ref}>
                                        <p className={`stat-number num-${index}`} itemProp="name">
                                            <CountUp start={inView ? 0 : stat.number} end={stat.number} delay={0} duration={2}/>
                                        </p>
                                        <p className="stat-description" itemProp="description">{stat.description}</p>
                                    </div>
                                    )
                                }
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </div>
    )
}