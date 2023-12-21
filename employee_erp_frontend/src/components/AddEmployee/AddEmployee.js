import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import Employee_Service from "../Services/Employee_Service";
import Department_Service from "../Services/Department_Service";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
      firstName: "",
      lastName: "",
      emailId: "",
      department: "",
      image: "",
      departments_name: [],
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
    this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
    this.changePhotoHandler = this.changePhotoHandler.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
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
    this.setState({ department: event.target.value });
  };
  changePhotoHandler = (e) => {
    const file = e.target.files[0];
    this.setState({
      image: file,
    });
  };

  saveEmployee = async (e) => {
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
      };

      const formData = new FormData();
      formData.append("firstName", this.state.firstName);
      formData.append("lastName", this.state.lastName);
      formData.append("emailId", this.state.emailId);
      formData.append("department", this.state.department);
      formData.append("file", this.state.image);

      await Employee_Service.createEmployee(formData);

      let selectedDepartment = this.state.departments_name.find(
        (depart) => depart.department_name === this.state.department
      );

      if (selectedDepartment) {
        await Department_Service.decreaseDepartmentCapacity(
          selectedDepartment.id
        );
        this.setState({ shouldRedirect: true });
      } else {
        console.error("Selected department not found");
      }
    } catch (error) {
      if (
        error.message &&
        error.message.includes("Request failed with status code 400")
      ) {
        alert("Email ID already exist");
        this.setState({ emailId: "" });
      } else {
        console.error("Error saving employee:", error);
        this.setState({ errorMessage: "An unexpected error occurred." });
      }
    }
  };

  componentDidMount() {
    Department_Service.getDepartment().then((res) => {
      this.setState({ departments_name: res.data });
    });
  }

  render() {
    return (
      <div>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="card col-md-6 offset-md-3">
              <h3 className="text-center fw-bold mb-2 text-uppercase mt-2">
                Add employee details
              </h3>
              <div className="card-body">
                <form
                  className="row g-3 needs-validation was-validated"
                  noValidate
                >
                  <div className="input-group mb-5">
                    <label className="input-group-text">First Name </label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control col-sm-6"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                      required
                    />
                  </div>

                  <div className="input-group mb-5">
                    <label className="input-group-text">Last Name </label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                      required
                    />
                  </div>

                  <div className="input-group mb-5">
                    <label className="input-group-text">Email ID </label>
                    <input
                      type="email"
                      placeholder="Email ID"
                      name="emailId"
                      className="form-control"
                      value={this.state.emailId}
                      onChange={this.changeEmailIdHandler}
                      required
                    />
                  </div>

                  <div className="input-group mb-5">
                    <label className="input-group-text">Department</label>
                    <select
                      className="form-select"
                      name="department"
                      value={this.state.department}
                      onChange={this.changeDepartmentHandler}
                      required
                    >
                      s
                      <option value="" disabled>
                        Select Department
                      </option>
                      {this.state.departments_name.map(
                        (depart) =>
                          depart.department_capacity > 0 && (
                            <option
                              key={depart.id}
                              value={depart.department_name}
                            >
                              {depart.department_name}
                            </option>
                          )
                      )}
                    </select>
                  </div>

                  <div className="input-group mb-5">
                    <input
                      type="file"
                      placeholder="File"
                      name="file"
                      className="form-control"
                      accept="image/*"
                      onChange={this.changePhotoHandler}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <Link to="/employees">
                      <button className="btn btn-danger">Cancel</button>
                    </Link>
                    <button
                      className="btn btn-success"
                      onClick={this.saveEmployee}
                      type="submit"
                    >
                      Save
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
