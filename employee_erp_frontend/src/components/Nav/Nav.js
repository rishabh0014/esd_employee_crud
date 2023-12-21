import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { isAuth, logout } = this.props;
    return (
      <div>
        <header>
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/home">
                Academic ERP
              </Link>
              <button
                className="navbar-toggler bg"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active" to={"/employees"}>
                      All Employees
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to={"/add_employee"}>
                      Add Employees
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to={"/"} onClick={logout}>
                      Log out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
