import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="container mt-5">
          <div className="card mt-5 mb-5">
            <h1 className="card-header text-center fw-bold mb-2 text-uppercase">
              Academic ERP
            </h1>
            <div className="card-body">
              <h5 className="card-title">4.2 Employee CRUD</h5>
              <p className="card-text">
                During registration ask for employee details including
                photograph(do not save as blob), and the department(Drop Down
                Selection), also check for department capacity. Assign a unique
                employee id. Allow modification of all details including
                employee id, photograph and department.
              </p>
              <div className="pt-3">
                <div className="d-flex justify-content-between">
                  <Link className="navbar-brand" to="/employees">
                    <button className="btn btn-primary">
                      List All Employee
                    </button>
                  </Link>
                  <Link className="navbar-brand" to="/add_employee">
                    <button className="btn btn-primary">
                      Add new Employee
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted mt-5">
              <b>Rishabh Teli MT2023061</b>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
