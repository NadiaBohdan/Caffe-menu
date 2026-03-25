import { categoryService } from "./categoty.service.js";

export const categoryController = {
    async addCategory(req, res) {
        const { title } = req.body;

        const category = await categoryService.addCategory({ title });

        res.status(201).json({
            message: "Category was created",
            category,
            success: true
        })
    },

    async updateCategories(req, res) {
        const { categoriesArray } = req.body;

        const categories = await categoryService.updateCategories(categoriesArray);

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