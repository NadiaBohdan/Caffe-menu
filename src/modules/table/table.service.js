import { tableRepository } from "./table.repository.js";
import { ApiError } from "#utils/error.util.js";

export const tableService = {

    /**
     * @param {Object} data 
     * @param {Number} data.tableNumber 
     */

    async addTable(data) {
        const isExist = await tableRepository.getByTableNumber(data);
        if(isExist) throw new ApiError(409, `Table with number: ${data.tableNumber} already exists`);

        const tablesArray = await tableRepository.create(data);
        if(!tablesArray) throw new ApiError(500, "Create error");

        return tablesArray;
    },

    async getAll() {
        return await tableRepository.getAll();
    },

    /**
     * @param {object} data
     * @param {number} data.id
     * @param {number} data.tableNumber
     * @param {boolean} data.isAvailable 
     */

    async updateTable(data) {
        console.log("Servise data: ", data);
        const tablesArray = await tableRepository.update(data);

        return tablesArray;
    },

    /**
     * @param {object} data
     * @param {number} data.id 
     */

    async deleteTable({ id }) {
        const tablesArray = await tableRepository.delete({ id });

        return tablesArray;
    },

    /**
     * @param {object} data
     * @param {number} data.id
     * @param {boolean} data.status
     */
    
// TO-DO race-condition check

    async changeStatus(data) {
        const table = await tableRepository.setStatus(data);
        if(!table) throw new ApiError(500, "Booking table error");

        return table;
    }
}