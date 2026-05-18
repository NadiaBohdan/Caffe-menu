import { categoryService } from "./category.service.js";

export const categoryController = {
    async addCategory(req, res) {
        await categoryService.addCategory(req.body);

        res.redirect('/admin/categories');
    },

    async updateCategories(req, res) {
        await categoryService.updateCategories(req.body);

        res.redirect('/admin/categories');
    },

    async deleteCategory(req, res) {
        await categoryService.deleteCategory(req.params);

        res.redirect('/admin/categories');
    }
}