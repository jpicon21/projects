import React, {useState} from 'react';
import { slidesData } from '../../constants/data';
import { Container, Col, Row } from "react-bootstrap";

const laptop = './images/product-tour/laptop-shell.png';

export default function Highlights() {
    const [isActive, setActive] = useState(0);
    const [slide, setSlide] = useState(0);

    let index = slide;

    const showNextSlide = () => {
        index++;
        setSlide(index);

        if (index > slidesData.length - 1) {
            index = 0;
            setSlide(index);
        }
    };

    const showPrevSlide = () => {
        index--;
        setSlide(index);

        if (index < 0) {
            index = slidesData.length - 1;
            setSlide(index);
        }
    };

    const toggleActive = (index) => {
        setActive(index);
    }

    return (
        <Container className="highlights-container" fluid>
            <div className="container-fluid col-lg-10">
                <Row>
                    <Col className="title-container">
                        <h2 className="section-title">
                            Product <strong>Highlights</strong>
                        </h2>
                    </Col>
                </Row>
              
                <Col className="outer-slider-container">
                    <div className="laptop-container" style={{ backgroundImage: `url(${laptop})` }}>
                        <div className="slides-container">
                            {slidesData.map((slide, s) => {
                                return (                                   
                                    <div className={`${isActive === s ? "slide active" : "slide"}`} key={s}>
                                        <img className="screen-image" src={slide.image} alt={slide.title}/>
                                    </div>                                 
                                )
                            })} 
                        </div>
                    </div>

                    <Row className="slide-descriptions-container">
                        {slidesData.map((slideDescription, desc) => {
                            return (
                                <p key={desc} className={`${isActive === desc ? "slide-title active" : "slide-title"}`}>
                                    {slideDescription.slideTitle}
                                </p>
                            )
                        })}
                    </Row>

                    <Row className={`slides-buttons-container justify-content-center`} data-animation="inview-fade-up">                        
                        <button 
                            aria-label="Previous Slide" 
                            className="pager prev" 
                            tabIndex="0" 
                            onClick={() => {
                            showPrevSlide();
                            toggleActive(index);
                            }}>    
                        </button>

                        {slidesData.map((dot, i) => {   
                            return ( 
                                <button 
                                    aria-label={`Navigate to slide ${i}`} 
                                    className={`${isActive === i ? "slide-btn active" : "slide-btn"}`} 
                                    aria-current={`${isActive === i ? true : false}`}
                                    onClick={() => {
                                        setSlide(i);
                                        toggleActive(i);
                                    }} 
                                key={i}></button>   
                            )
                        })} 

                        <button 
                            aria-label="Next Slide" 
                            className="pager next" 
                            tabIndex="0"
                            onClick={() => { 
                            showNextSlide();
                            toggleActive(index);
                            }}> 
                        </button>
                    </Row>
                </Col>
            </div>
        </Container>
    )
}