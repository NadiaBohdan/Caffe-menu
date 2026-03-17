import { tableService } from "./table.service.js";

export const tableController = {
    async addTable(req, res) {
        const { tableNumber } = req.body.data;

        const table = await tableService.addTable({ tableNumber });

        res.status(201).json({ success: true, message: "Table was successfully added", table });
    },

    async updateTable(req, res) {
        const { id } = req.params;
        const { tableNumber, isAvailable } = req.body.data;

        const table = await tableService.updateTable({ id, tableNumber, isAvailable });

        res.status(200).json({ success: true, message: "Table was successfully updated", table });
    },

    async deleteTable(req, res) {
        const { id } = req.params;

        await tableService.deleteTable(id);

        res.sendStatus(204);
    },

    async getAllTables(req, res) {
        const tables = await tableService.getAll()
        res.status(200).json({ success: true, tables });
    }
}