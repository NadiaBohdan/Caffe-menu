import { staffService } from "#staff/staff.service.js";
import { categoryService } from "#category/category.service.js";
import { productService } from "#product/product.service.js";
import { contactService } from "#contact/contact.service.js";

export const adminSSRservice = {
    async getCategories(id) {
        const categories = await categoryService.getAll();
        const staff = await staffService.getById({ id });

        return { staff, categories };
    },

    async getProducts(id) {
        const products = await productService.getAll();
        const staff = await staffService.getById({ id });

        return { staff, products };
    },

    async getContacts(id) {
        const contacts = await contactService.getAll();
        const staff = await staffService.getById({ id });

        return { staff, contacts };
    }
}