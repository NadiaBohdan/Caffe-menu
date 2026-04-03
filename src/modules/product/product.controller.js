import { productService } from "./product.service.js";

export const productController = {
    async addProduct(req, res) {
        await productService.addProduct(req.body);
        res.redirect("/admin/menu");
    },

    async deleteProduct(req, res) {
        await productService.deleteProduct(req.params);
        res.redirect('/admin/menu');
    },

    async updateProduct(req, res) {
        await productService.updateProduct(req.body);
        res.redirect('/admin/menu');
    }
}