import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import './dashboard.css';
import Leaderboard from '../layout/Leaderboard';


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      score: "0",
      users: [{name: "Creed Bratton", score: 10680},
              {name: "Pam Beesly", score: 340},
              {name: "Dwight Schrute", score: 260},
              {name: "Michael Scott", score: 40},],
    };
  }
  render() {
    const { user } = this.props.auth;

    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              Hello,{user.name.split(" ")[0]}
              <p className="flow-text">Check out the leaderboard </p>
            </h4>

            {/* leaderboard */}
            {/* <div>
              {user.length ? (
                <div className="listgroup">
                  <h3>Leaderboard</h3>
                  {user.name.map((user) => (
                    <div className="listitem" key={user._id}>
                      <h5>PLAYER NAME</h5>
                      {user.name}
                      <h5>Score</h5>
                      {user.score}
                    </div>
                  ))}
                </div>
              ) : (
                <h5>(No Results to Display)</h5>
              )} */}

<div className="Leaders">
  <Leaderboard users={this.state.users} />

</div>


{/* </div> */}

          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  // getScore: PropTypes.func.isRequired,
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});



export default connect(mapStateToProps, { logoutUser })(Dashboard);
