import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Button, Col, Row, CloseButton } from "react-bootstrap";

const video = "./video/slate-digital-asset-finance-platform.mp4";
const graphic = "./images/video/loan-trading-platform.png";

export default function Video() {
  const [showVideo, setVideo] = useState(false);
  const [isPlaying, setPlaying] = useState(false);

  const playVideoBtn = () => {
    setPlaying(true);
    setVideo(true);
  };

  const stopVideo = () => {
    setPlaying(false);
    setVideo(false);
  };

  return (
    <div className="hero-container" itemScope itemType="https://schema.org/FinancialProduct">
      {!showVideo && (
        <>
          <Row className="row-title">
            <Col className="text-section">
              <h1 className="hero-text" itemProp="name">
                Whole loan investment <br/>
                <strong>Reimagined.</strong>
              </h1>
            </Col>
          </Row>
          <Row className="row-desc">
            <Col>
              <p className="hero-desc" itemProp="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </Col>
          </Row>
          <Button className="play-button" onFocus={playVideoBtn}>
            <svg
              version="1.1"
              id="play"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              height="100px"
              width="100px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 100 100"
            >
              <path
                className="stroke-solid"
                fill="none"
                stroke="#493F8B"
                d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7C97.3,23.7,75.7,2.3,49.9,2.5"
              />
              <path
                className="icon"
                fill="#493F8B"
                d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
              />
            </svg>
          </Button>
          <div className="graphic-wrapper">
            <img className="graphic-image" src={graphic} alt="infographic" />
          </div>
        </>
      )}
      {showVideo && (
        <>
        <Col className="video-container" itemScope iteProp="VideoObject" itemType="https://schema.org/VideoObject">
        <CloseButton className="close-video" onClick={stopVideo} />
          <ReactPlayer
            url={video}
            playing={isPlaying}
            width="100%"
            height="100%"
          />
        </Col>
        </>
      )}
    </div>
  );
}
