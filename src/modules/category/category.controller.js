import { categoryService } from "./category.service.js";

export const categoryController = {
    async addCategory(req, res) {
        const category = await categoryService.addCategory(req.body);

        res.status(201).json({
            message: "Category was created",
            category,
            success: true
        })
    },

    async updateCategories(req, res) {
        const categories = await categoryService.updateCategories(req.body);

        res.status(200).json({
            message: "Categoryes was updated",
            categories,
            success: true
        })
    },

    async deleteCategory(req, res) {
        await categoryService.deleteCategory(req.params);

        res.status(200).json({
            message: "Category was deleted",
            success: true
        })
    }
}