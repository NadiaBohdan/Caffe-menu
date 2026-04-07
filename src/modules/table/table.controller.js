import { tableService } from "./table.service.js";

export const tableController = {
    async addTable(req, res) {
        const tablesArray = await tableService.addTable(req.body);

        res.status(201).json({
            message: "Table was successfully added",
            tablesArray,
            success: true
        });
    },

    async updateTable(req, res) {
        const tablesArray = await tableService.updateTable({ ...req.params, ...req.body });

        res.status(200).json({ 
            message: "Table was successfully updated", 
            tablesArray,
            success: true 
        });
    },

    async deleteTable(req, res) {
        const tablesArray = await tableService.deleteTable(req.params);

        res.status(200).json({
            message: "Table was successfully deleted",
            tablesArray,
            success: true
        });
    },

    async getAllTables(req, res) {
        const tablesArray = await tableService.getAll()
        res.status(200).json({ success: true, tablesArray });
    }
}