import React from 'react';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Highlights from './components/Highlights/Highlights';
import Partners from './components/Partners/Partners';
import Cta from './components/Cta/Cta';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Contact from './components/Contact/contact';
import Login from './components/Login/login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import './App.scss';


export default function RouterSwitch() {
  return (
    <HelmetProvider>
      <Router forceRefresh={true}>
        <Container>
          <Header />
          <Switch>
            <Route exact path="/">
              <Helmet>
                <title>Slate, the Digital Asset Finance Platform for Whole Loans</title>
                <meta name="description" content="SLATE connects Securitized Product Investors with Whole Loan investment opportunities using a robust online trading platform. Demo our efficient approach to loan management." />
              </Helmet>
              <Home />
            </Route>
            <Route path="/contact">
              <Helmet>
                <title>Learn More About Slate Loan Trading Platform</title>
                <meta name="description" content="SLATE provides an end-to-end solution for its clients looking to invest in Whole Loan opportunities. Schedule your demo today." />
              </Helmet>
              <ContactPage />
            </Route>
            <Route path="/login">
              <Helmet>
                <title>Slate Digital Asset Finance Platform Login</title>
              </Helmet>
              <LoginPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </HelmetProvider>
  );
}

function Home() {
  return (
    <div className="App">
      <Container>
        <Hero />
        <Features />
        <Highlights />
        <Partners />
        <Cta />
        <Footer />
      </Container>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="App contact-wave" style={{overflow: "hidden"}}>
      <Container contactUs="contact-container">
        <Contact />
        <Footer contact="contact-footer"></Footer>
      </Container>
    </div>
  );
}


function LoginPage() {
  return (
    <div className="App contact-wave" style={{overflow: "hidden"}}>
      <Container contactUs="contact-container">
        <Login />
        <Footer contact="contact-footer"></Footer>
      </Container>
    </div>
  );
}

