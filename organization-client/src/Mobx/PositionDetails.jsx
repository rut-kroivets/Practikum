import { observable, action, makeObservable } from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';

class PositionDetails {
    positions = [];

    constructor() {
        makeObservable(this, {
            positions: observable,
            fetchPosition: action,
            addPosition: action,
            updatePosition: action,
            deletePosition: action,
        });
    }

    async getPosition() {
        try {
            const response = await axios.get("https://localhost:7163/api/Position");
            this.fetchPosition(response.data); 
        } catch (error) {
            console.error("Error fetching position:", error);
        }
        return this.positions;
    }

    fetchPosition(positions) {        
        this.positions = positions;
    }

    async addPosition(s) {
        try {
            const response = await axios.post("https://localhost:7163/api/Position", s);
            runInAction(() => {
                this.positions.push(response.data);
            });
        } catch (error) {
            console.error('Error adding position:', error);
        }
    }

    async updatePosition(updatedItem,id) {
        try {
            const response = await axios.put(`https://localhost:7163/api/Position/${id}`, updatedItem);
            runInAction(() => {
                const index = this.positions.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    this.positions[index] = response.data;
                }
            });
        } catch (error) {
            console.error('Error updating position:', error);
        }
    }

    async deletePosition(itemId) {
        try {
            await axios.delete(`https://localhost:7163/api/Position/${itemId}`);
            runInAction(() => {
                this.positions = this.positions.filter(item => item.id !== itemId);
            });
        } catch (error) {
            console.error('Error deleting position:', error);
        }
    }
}

export default new PositionDetails();
