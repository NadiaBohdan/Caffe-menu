import { productService } from "./product.service.js";

export const productController = {
    async add(req, res) {
        await productService.add({ ...req.body, buffer: req.file.buffer });
        res.redirect("/admin/menu");
    },

    async delete(req, res) {
        await productService.delete(req.params);
        res.redirect('/admin/menu');
    },

    async updateOne(req, res) {
        await productService.updateOne({ ...req.body, ...req.params, buffer: req.file.buffer });
        res.redirect('/admin/menu');
    },

    async updateMany(req, res) {
        await productService.updateMany(req.body);
        res.redirect('/admin/menu');
    }
}