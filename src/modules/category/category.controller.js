import { categoryService } from "./categoty.service.js";

export const categoryController = {
    async addCategory(req, res) {
        const { categoryData } = req.body;

        const category = await categoryService.addCategory(categoryData);

        res.status(201).json({
            message: "Category was created",
            category,
            success: true
        })
    },

    async updateCategory(req, res) {
        const { categoriesData } = req.body;

        const categories = await categoryService.updateCategory(categoriesData);

        res.status(200).json({
            message: "Categoryes was updated",
            categories,
            success: true
        })
    },

    async deleteCategory(req, res) {
        const { id } = req.params;

        await categoryService.deleteCategoty(id);

        res.status(200).json({
            message: "Category was deleted",
            success: true
        })
    }
}