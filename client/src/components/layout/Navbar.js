import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import logo from "../../images/danger-noodle.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <nav className="navbar">
        <div class="nav-wrapper">
          <div class="logo">
            <Link to="/">
              <img src={logo} alt="Danger Noodle Game Logo" />
            </Link>
          </div>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <Link to="/dashboard">Leaderboard</Link>
            </li>
            <li>
              <Link to="/game">Play</Link>
            </li>
              <li>
                <Link
                  onClick={this.onLogoutClick}
                  to="/logout"
                >
                  Logout
                </Link>
              </li>
              <li>
              <iframe src="https://open.spotify.com/embed/track/6cthJIumjsMpJBeDJ2w6Dn" width="80" height="100" frameborder="0" allow="encrypted-media"></iframe>
              </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
