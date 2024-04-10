import { observable, action, makeObservable } from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';

class RoleDetails {
    roles = [];

    constructor() {
        makeObservable(this, {
            roles: observable,
            fetchRole: action,
            addRole: action,
            updateRole: action,
            deleteRole: action,
        });
    }

    async getRole() {
        try {
            const response = await axios.get("https://localhost:7163/api/Role");
            this.fetchRole(response.data); 
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
        return this.roles;
    }

    fetchRole(roles) {        
        this.roles = roles;
    }


    async addRole(s) {
        console.log(s);
        const token=localStorage.getItem('token');
        console.log(token);
        const headers = {
            Authorization: `Bearer ${token}` 
        };
        try {
            const response = await axios.post("https://localhost:7163/api/Role", s,{headers});
            runInAction(() => {
                this.roles.push(response.data);
            });
        } catch (error) {
            console.error('Error adding role:', error);
        }
    }

    async updateRole(updatedItem,id) {
        try {
            const response = await axios.put(`https://localhost:7163/api/Role/${id}`, updatedItem);
            runInAction(() => {
                const index = this.roles.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    this.roles[index] = response.data;
                }
            });
        } catch (error) {
            console.error('Error updating roles:', error);
        }
    }

    async deleteRole(itemId) {
        try {
            await axios.delete(`https://localhost:7163/api/Role/${itemId}`);
            runInAction(() => {
                this.roles = this.roles.filter(item => item.id !== itemId);
            });
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    }
}

export default new RoleDetails();
