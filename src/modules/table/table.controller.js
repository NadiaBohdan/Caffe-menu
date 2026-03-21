import { tableService } from "./table.service.js";

export const tableController = {
    async addTable(req, res) {
        const { tableNumber } = req.body.data;

        const tablesArray = await tableService.addTable({ tableNumber });

        res.status(201).json({
            message: "Table was successfully added",
            tablesArray,
            success: true
        });
    },

    async updateTable(req, res) {
        const { id } = req.params;
        const { tableNumber, isAvailable } = req.body.data;

        const tablesArray = await tableService.updateTable({ id, tableNumber, isAvailable });

        res.status(200).json({ 
            message: "Table was successfully updated", 
            tablesArray,
            success: true 
        });
    },

    async deleteTable(req, res) {
        const { id } = req.params;

        const tablesArray = await tableService.deleteTable(id);

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