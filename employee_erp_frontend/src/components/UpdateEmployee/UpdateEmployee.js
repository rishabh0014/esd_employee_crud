import React, { Component } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Employee_Service from "../Services/Employee_Service";
import { withParams } from "../UtiliyFunction/Get_Id";
import Department_Service from "../Services/Department_Service";

class UpdateEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
    let { id } = props.params;

    this.state = {
      id: id,
      firstName: "",
      lastName: "",
      emailId: "",
      department: "",
      departments_name: [],
      old_emailId: "",
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
    this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
  }
  componentDidMount() {
    Employee_Service.getEmployeeById(this.state.id).then((res) => {
      let employee = res.data;
      this.state = {
        shouldRedirect: false,
        shouldchange: false,
      };
      this.setState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        emailId: employee.emailId,
        department: employee.department,
        image: employee.imageString,
        oldimage: employee.imageString,
        old_emailId: employee.emailId,
      });
    });
    Department_Service.getDepartment().then((res) => {
      this.setState({ departments_name: res.data });
    });
  }
  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };
  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };
  changeEmailIdHandler = (event) => {
    this.setState({ emailId: event.target.value });
  };
  changeDepartmentHandler = (event) => {
    this.setState({ shouldchange: true });
    let oldDepartment = this.state.departments_name.find(
      (depart) => this.state.department === depart.department_name
    );
    Department_Service.increaseDepartmentCapacity(oldDepartment.id);
    this.setState({ department: event.target.value });
  };
  changePhotoHandler = (e) => {
    const file = e.target.files[0];
    this.setState({
      image: file,
    });
  };

  updateEmployee = async (e) => {
    e.preventDefault();

    try {
      if (
        !this.state.firstName ||
        !this.state.lastName ||
        !this.state.emailId ||
        !this.state.department ||
        !this.state.image
      ) {
        alert("Please fill in all the required fields.");
        return;
      }

      let employee = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailId: this.state.emailId,
        department: this.state.department,
        image: this.state.image,
        oldimage: this.state.image,
      };

      const formData = new FormData();
      formData.append("firstName", this.state.firstName);
      formData.append("lastName", this.state.lastName);
      formData.append("emailId", this.state.emailId);
      formData.append("department", this.state.department);
      formData.append("file", this.state.image);

      await Employee_Service.updateEmployee(formData, this.state.id);

      let selectedDepartment = this.state.departments_name.find(
        (depart) => depart.department_name === this.state.department
      );

      if (this.state.shouldchange) {
        await Department_Service.decreaseDepartmentCapacity(
          selectedDepartment.id
        );
      }

      this.setState({ shouldRedirect: true });
    } catch (error) {
      if (
        error.message &&
        error.message.includes("Request failed with status code 400")
      ) {
        alert("Email ID already exists");
        this.setState({ emailId: this.state.old_emailId });
      } else {
        console.error("Error updating employee:", error);
        this.setState({ errorMessage: "An unexpected error occurred." });
      }
    }
  };

  render() {
    return (
      <div>
        <div className="container mt-5 mb-5">
          <img
            src={`http://localhost:8080/api/v1/images/${this.state.oldimage}`}
            height={"200px"}
            width={"200px"}
            alt={`${this.state.image}`}
            className="img-fluid rounded m-2 mx-auto d-block"
          />
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <div className="card-body">
                <form>
                  <div className="input-group mb-5">
                    <label className="input-group-text">First Name </label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control col-sm-6"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>
                  <div className="input-group mb-5">
                    <label className="input-group-text">Last Name </label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control col-sm-6"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>
                  <div className="input-group mb-5">
                    <label className="input-group-text">Email ID </label>
                    <input
                      type="text"
                      placeholder="Email ID"
                      name="emailId"
                      className="form-control col-sm-6"
                      value={this.state.emailId}
                      onChange={this.changeEmailIdHandler}
                    />
                  </div>
                  <div className="input-group mb-5">
                    <label className="input-group-text">Department</label>
                    <select
                      className="form-select"
                      name="department"
                      value={this.state.department}
                      onChange={this.changeDepartmentHandler}
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      {this.state.departments_name.map((depart) => (
                        <option key={depart.id} value={depart.department_name}>
                          {depart.department_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group mb-5">
                    <input
                      type="file"
                      placeholder="File"
                      name="emailId"
                      className="form-control"
                      accept="image/*"
                      onChange={this.changePhotoHandler}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <Link to="/employees">
                      <button className="btn btn-danger">Cancel</button>
                    </Link>
                    <button
                      className="btn btn-success"
                      onClick={this.updateEmployee}
                    >
                      Update
                    </button>
                  </div>
                </form>
                {this.state.shouldRedirect ? (
                  <Navigate replace to="/employees" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(UpdateEmployee);
