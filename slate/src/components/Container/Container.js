import React from "react";

export default function Container({ children }, props) {

  return (
    <div className="site-container">
      <div className="sections-wrapper">{children}</div>
    </div>
  );
}
