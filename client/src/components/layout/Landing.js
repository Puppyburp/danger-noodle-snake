import React, { Component } from "react";
import { Link } from "react-router-dom";
import snake from "../../images/snake.png";
import "./landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <div className="snake">
              <Link to="/">
                <img
                  src={snake}
                  alt="Snake"
                  className="col brand-logo center"
                />
              </Link>
            </div>
            <h4>Ready to Play?</h4>
            <p className="flow-text col">Register or login to start!</p>
            <br />
            <div class="row">
              <div className="col s12">
                <Link
                  to="/login"
                  style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-large btn-flat white-text login-btn"
                >
                  <i className="material-icons left">person</i>Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    width: "200px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    textAlign: "center",
                  }}
                  className="btn btn-large btn-flat white-text register-btn"
                >
                  Register
                </Link>
              </div>
              <div className="col s12"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
