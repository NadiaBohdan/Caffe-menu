import { createTableDto, updateTableDto, updateStatusDto, tableIdDto } from "./table.dto.js";
import { tableRepository } from "./table.repository.js";

export const tableService = {

    /**
     * @param {Object} data 
     * @param {Number} data.tableNumber 
     */

    async addTable(data) {
        const parsed = createTableDto.parse(data);

        const table = await tableRepository.create(parsed);
        if(!table) throw new Error("Create error");

        return table;
    },

    async getAll() {
        return await tableRepository.getAll();
    },

    /**
     * @param {object} data
     * @param {string} data.id
     * @param {number} data.tableNumber
     * @param {boolean} data.boolean 
     */

    async updateTable(data) {
        const parsed = updateTableDto.parse(data);
        
        //@ts-ignore
        const table = await tableRepository.update(parsed);
        if(!table) throw new Error("Create error");

        return table;
    },

    /**
     * @param {number} rawId 
     */

    async deleteTable(rawId) {
        const { id } = tableIdDto.parse({ id: rawId });

        const table = await tableRepository.delete(id);
        if(!table) throw new Error("Delete error");

        return table;
    },

    /**
     * @param {object} data
     * @param {string} data.id
     * @param {boolean} data.status
     */

    async changeStatus(data) {
        const parsed = updateStatusDto.parse(data);

        //@ts-ignore
        const table = await tableRepository.setStatus(parsed);
        if(!table) throw new Error("Booking table error");

        return table;
    }
}