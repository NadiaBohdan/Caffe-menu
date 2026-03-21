import { createTableDto, updateTableDto, updateStatusDto, tableIdDto } from "./table.dto.js";
import { tableRepository } from "./table.repository.js";
import { ApiError } from "#utils/error.util";

export const tableService = {

    /**
     * @param {Object} data 
     * @param {Number} data.tableNumber 
     */

    async addTable(data) {
        const parsed = createTableDto.parse(data);

        const isExist = await tableRepository.getByTableNumber(parsed);
        if(isExist) throw new ApiError(409, `Table with number: ${data.tableNumber} already exists`);

        const tablesArray = await tableRepository.create(parsed);
        if(!tablesArray) throw new ApiError(500, "Create error");

        return tablesArray;
    },

    async getAll() {
        return await tableRepository.getAll();
    },

    /**
     * @param {object} data
     * @param {string} data.id
     * @param {number} data.tableNumber
     * @param {boolean} data.isAvailable 
     */

    async updateTable(data) {
        const parsed = updateTableDto.parse(data);

        //@ts-ignore
        const tablesArray = await tableRepository.update(parsed);

        return tablesArray;
    },

    /**
     * @param {number} rawId 
     */

    async deleteTable(rawId) {
        const { id } = tableIdDto.parse({ id: rawId });

        const tablesArray = await tableRepository.delete(id);

        return tablesArray;
    },

    /**
     * @param {object} data
     * @param {string} data.id
     * @param {boolean} data.status
     */
    
// TO-DO race-condition check

    async changeStatus(data) {
        const parsed = updateStatusDto.parse(data);

        //@ts-ignore
        const table = await tableRepository.setStatus(parsed);
        if(!table) throw new ApiError(500, "Booking table error");

        return table;
    }
}