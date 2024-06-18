import React, {useState, useEffect} from 'react';
import Video from '../Video/Video';
//import Stats from '../Stats/Stats';
import { Container } from "react-bootstrap";

const topWave = './images/slate-loan-marketplace-wave.png';
const mobileWave = './images/mobile-slate-loan-marketplace-wave.png';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 768) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Container className="wave-container m-auto col-lg-10" fluid>
      <div className="inner-container">
        {isMobile ? (
          <div className="wave-background" style={{ backgroundImage: `url(${mobileWave})` }}></div>
        ) : (
          <div className="wave-background" style={{ backgroundImage: `url(${topWave})` }}></div>
        )}
        <Video/>
        {/*<Stats />*/}
      </div>
    </Container>
  );
}
