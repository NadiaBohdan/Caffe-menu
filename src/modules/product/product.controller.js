import { productService } from "./product.service.js";

export const productController = {
    async addProduct(req, res) {
        await productService.addProduct({ ...req.body, buffer: req.file.buffer });
        res.redirect("/admin/menu");
    },

    async deleteProduct(req, res) {
        await productService.deleteProduct(req.params);
        res.redirect('/admin/menu');
    },

    async updateOneProduct(req, res) {
        await productService.updateOne({ ...req.body, buffer: req.file.buffer });
        res.redirect('/admin/menu');
    },

    async updateManyProducts(req, res) {
        await productService.updateMany(req.body);
        res.redirect('/admin/menu');
    }
}