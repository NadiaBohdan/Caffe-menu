import { staffService } from "./staff.service.js";

const REDIRECT_PATH = "/admin/staff";

export const staffController = {
    async add(req, res) {
        await staffService.add(req.body);
        res.redirect(REDIRECT_PATH);
    },

    async delete(req, res) {
        await staffService.delete(req.params);
        res.redirect(REDIRECT_PATH);
    },

    async update(req, res) {
        await staffService.update({ ...req.body, ...req.params });
        res.redirect(REDIRECT_PATH);
    }
}