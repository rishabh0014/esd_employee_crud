import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

export default class NotFound extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { isAuth, logout } = this.props;
    return (
      <div>
        <div className="container d-flex align-items-center justify-content-center">
          <div className="row">
            <div className="col-md-12">
              <div className="error-template">
                <h1>Oops!</h1>
                <h2>404 Not Found</h2>
                <div className="error-details">
                  <div>
                    Sorry, an error has occured, Requested page not found!
                  </div>
                  <div>Log In again!!</div>
                </div>
                <div className="error-actions">
                  <li className="nav-item">
                    <Link className="nav-link active" to={"/"} onClick={logout}>
                      <button className="btn btn-primary">Log in</button>
                    </Link>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
