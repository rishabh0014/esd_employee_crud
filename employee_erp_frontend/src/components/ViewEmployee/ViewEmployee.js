import React, { Component } from "react";
import "./viewEmployee.css";
import { Link, Navigate } from "react-router-dom";
import { withParams } from "../UtiliyFunction/Get_Id";
import Employee_Service from "../Services/Employee_Service";
import Department_Service from "../Services/Department_Service";

class ViewEmployee extends Component {
  constructor(props) {
    super(props);
    let { id } = props.params;
    this.state = {
      shouldRedirect: false,
      id: id,
      employees: [],
      employee: {},
      departments_name: [],
    };
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }
  deleteEmployee(id) {
    Employee_Service.deleteEmployee(id).then((res) => {
      this.setState({ shouldRedirect: true });
      this.setState({
        employees: this.state.employees.filter(
          (employee) => employee.id !== id
        ),
      });
    });
  }
  componentDidMount() {
    Employee_Service.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    });
    Employee_Service.getEmployeeById(this.state.id).then((res) => {
      this.setState({ employee: res.data });
    });
    Department_Service.getDepartment().then((res) => {
      this.setState({ departments_name: res.data });
    });
  }
  render() {
    return (
      <div>
        <h3 className="text-center fw-bold mb-2 text-uppercase m-3">
          View Employee Details
        </h3>

        <div className="container mb-4 p-3 d-flex justify-content-center">
          <div className="card__ p-4">
            <div className=" image d-flex flex-column justify-content-center align-items-center">
              <button className="btn2 btn-secondary">
                <img
                  src={`http://localhost:8080/api/v1/images/${this.state.employee.imageString}`}
                  height={"100px"}
                  width={"100px"}
                  alt={`${this.state.employee.imageString}`}
                />
              </button>
              <span className="name mt-3">
                {this.state.employee.firstName} {this.state.employee.lastName}
              </span>
              <span className="idd">{this.state.employee.emailId}</span>
              <span className="follow">{this.state.employee.department}</span>
            </div>
            <div className=" d-flex justify-content-between mt-3">
              <Link to={`/employees`}>
                <button className="btn btn-success">Cancel</button>
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.deleteEmployee(this.state.employee.id);
                  let currentDepartment = this.state.departments_name.find(
                    (depart) =>
                      this.state.employee.department === depart.department_name
                  );
                  Department_Service.increaseDepartmentCapacity(
                    currentDepartment.id
                  );
                }}
              >
                Delete
              </button>
              <Link to={`/update_employee/${this.state.employee.id}`}>
                <button className="btn btn-success">Edit Profile</button>
              </Link>
              {this.state.shouldRedirect ? (
                <Navigate replace to="/employees" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(ViewEmployee);
