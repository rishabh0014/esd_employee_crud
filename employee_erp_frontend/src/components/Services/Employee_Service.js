import axios from "axios";

const Employee_API_URL = "http://localhost:8080/api/v1/employees";

class Employee_Serevice {
  getEmployees() {
    return axios.get(Employee_API_URL);
  }

  createEmployee(employee) {
    return axios.post(Employee_API_URL, employee);
  }
  getEmployeeById(employeeId) {
    return axios.get(Employee_API_URL + "/" + employeeId);
  }

  updateEmployee(employee, employeeId) {
    return axios.put(Employee_API_URL + "/" + employeeId, employee);
  }

  deleteEmployee(employeeId) {
    return axios.delete(Employee_API_URL + "/" + employeeId, employeeId);
  }
}

export default new Employee_Serevice();
