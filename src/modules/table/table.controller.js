import { tableService } from "./table.service.js";

export const tableController = {
    async addTable(req, res, next) {
        try {
            const { tableNumber } = req.body.data;

            const table = await tableService.addTable({ tableNumber });

            res.status(201).json({ message: "Table was successfully added", table });
        } catch(err) {
            next(err);
        }
    },

    async updateTable(req, res, next) {
        try {
            const { id } = req.params;
            const { tableNumber, isAvailable } = req.body.data;

            const table = await tableService.updateTable({ id, tableNumber, isAvailable });

            res.status(200).json({ message: "Table was successfully updated", table });
        } catch(err) {
            next(err);
        }
    },

    async deleteTable(req, res, next) {
        try {
            const { id } = req.params;

            await tableService.deleteTable(id);

            res.sendStatus(204);
        } catch(err) {
            next(err);
        }
    },

    async getAllTables(req, res, next) {
        try {
            const tables = await tableService.getAll()
            res.status(200).json({ tables });
        } catch(err) {
            next(err);
        }
    }
}