import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <hr color="#df1bbf" />
      <div className="container">
        <div className="row">
          <div className="col s4">
            <div>
              <p>&#169; 2020 Puppyburp Inc.</p>
            </div>
          </div>
          <div className="col s4">
            <div>
              <p>Github Link</p>
            </div>
          </div>
          <div className="col s4">
            <div>
              <p>Contact</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
