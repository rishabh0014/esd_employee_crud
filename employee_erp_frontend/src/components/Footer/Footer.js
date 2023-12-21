import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";
import "./footer.css";
export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="d-flex flex-column mi-vh-100">
          <div className="footer-dark">
            <footer className="mt-auto">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6 col-md-3 item">
                    <h3>Services</h3>
                    <ul>
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
                        <Link className="nav-link active" to={"/"}>
                          Log out
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-6 col-md-3 item"></div>
                  <div className="col-md-6 item text">
                    <h3>Academic ERP</h3>
                    <p>
                      Our Academic ERP streamlines administrative processes,
                      enhances communication, and facilitates efficient
                      management of educational resources for an integrated and
                      organized academic environment.
                    </p>
                  </div>
                  <div className="col item social">
                    <a
                      href="https://linkedin.com/in/rishabh-teli"
                      target="_blank"
                    >
                      <TiSocialLinkedin />
                    </a>
                    <a href="https://github.com/rishabh0014" target="_blank">
                      <FaGithub />
                    </a>
                  </div>
                </div>
                <p className="copyright">Academic ERP © 2023</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
