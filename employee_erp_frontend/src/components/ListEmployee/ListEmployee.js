import React, { Component } from "react";
import "./ListEmployee.css";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Employee_Service from "../Services/Employee_Service";
import Department_Service from "../Services/Department_Service";

export default class List_Employee_details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      departments_name: [],
    };
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  deleteEmployee(id) {
    Employee_Service.deleteEmployee(id).then((res) => {
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
    Department_Service.getDepartment().then((res) => {
      this.setState({ departments_name: res.data });
    });
  }
  render() {
    return (
      <div>
        <h2 className="text-center mt-2 fw-bold mb-2 text-uppercase">
          All Employees
        </h2>
        <div className="row mt-3 mb-5">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>Photo</th>
                <th>Name</th>
                <th>Email ID</th>
                <th>Department</th>
                <th>Update</th>
                <th>Delete</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id} className="text-center">
                  <td>
                    <div className="profile_photo">
                      <img
                        src={`http://localhost:8080/api/v1/images/${employee.imageString}`}
                        height={"100px"}
                        width={"100px"}
                        alt={`${employee.imageString}`}
                      />
                    </div>
                  </td>
                  <td>
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td>{employee.emailId}</td>
                  <td>{employee.department}</td>
                  <td className="text-center">
                    <Link to={`/update_employee/${employee.id}`}>
                      <button className="btn btn-info">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.deleteEmployee(employee.id);
                        let currentDepartment =
                          this.state.departments_name.find(
                            (depart) =>
                              employee.department === depart.department_name
                          );
                        Department_Service.increaseDepartmentCapacity(
                          currentDepartment.id
                        );
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                  <td>
                    <Link to={`/view_employee/${employee.id}`}>
                      <button className="btn btn-success">
                        <FaEye />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
