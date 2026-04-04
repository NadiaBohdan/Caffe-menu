import { productService } from "./product.service.js";

export const productController = {
    async add(req, res) {
        const buffer = req.file?.buffer || null;

        await productService.add({ ...req.body, buffer });
        res.redirect("/admin/menu");
    },

    async delete(req, res) {
        await productService.delete(req.params);
        res.redirect('/admin/menu');
    },

    async updateOne(req, res) {
        const buffer = req.file?.buffer || null;

        await productService.updateOne({ ...req.body, ...req.params, buffer });
        res.redirect('/admin/menu');
    },

    async updateMany(req, res) {
        await productService.updateMany(req.body);
        res.redirect('/admin/menu');
    }
}