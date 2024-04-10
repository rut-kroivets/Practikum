import { observable, action, makeObservable } from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';

class EmployeeDetails {
    employees = [
       { "id": 5,
        "identity": "123456",
        "firstName": "Rut",
        "lastName": "Kroivets",
        "startOfWork": "2024-04-02T13:38:46.017",
        "dateOfBirth": "2024-04-02T13:38:46.017",
        "gender": 1,
        "positions": []}
    ];

    constructor() {
        makeObservable(this, {
            employees: observable,
            fetchEmployee: action,
            addEmployee: action,
            updateEmployee: action,
            deleteEmployee: action,
        });
    }

    async getEmployee() {
        try {
            const response = await axios.get("https://localhost:7163/api/Employee");
            this.fetchEmployee(response.data); 
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
        return this.employees;
    }

    fetchEmployee(employees) {      
        this.employees = employees;
    }

    async addEmployee(s) {
        try {
            const response = await axios.post("https://localhost:7163/api/Employee", s);
            runInAction(() => {
                this.employees.push(response.data);
            });
        } catch (error) {
            console.error('Error adding employees:', error);
        }
    }

    async updateEmployee(updatedItem,id) {
        console.log(updatedItem)
        try {
            const response = await axios.put(`https://localhost:7163/api/Employee/${id}`, updatedItem);
            console.log(response.data)
            runInAction(() => {
                const index = this.employees.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    this.employees[index] = response.data;
                }
            });
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    }

    async deleteEmployee(itemId) {
        try {
            await axios.delete(`https://localhost:7163/api/Employee/${itemId}`);
            runInAction(() => {
                this.employees = this.employees.filter(item => item.id !== itemId);
            });
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    }
}

export default new EmployeeDetails();
