import React from "react";

export default function Footer(props) {
  return (
    <footer className={`footer-container ${props.contact}`}>
        <p className="copyright">
          &copy; 2021 Credit Suisse Securities (USA) LLC <br /> SLATE Digital
          Asset Platform is a registered trademark of Credit Suisse Securities
          (USA) LLC. All rights reserved
        </p>
    </footer>
  );
}
