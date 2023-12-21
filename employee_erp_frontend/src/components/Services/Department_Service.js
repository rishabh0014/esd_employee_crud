import axios from "axios";

const Department_API_URL = "http://localhost:8080/api/v1/departments";

class Department_Service {
  getDepartment() {
    return axios.get(Department_API_URL);
  }

  decreaseDepartmentCapacity(departmentId) {
    const Department_Capacity_Decrease_URL = `${Department_API_URL}/${departmentId}/decreaseCapacity`;
    return axios.put(Department_Capacity_Decrease_URL);
  }

  increaseDepartmentCapacity(departmentId) {
    const Department_Capacity_increase_URL = `${Department_API_URL}/${departmentId}/increaseCapacity`;
    return axios.put(Department_Capacity_increase_URL);
  }
}

export default new Department_Service();
