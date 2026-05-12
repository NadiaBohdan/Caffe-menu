import { staffService } from "#staff/staff.service.js";
import { categoryService } from "#category/category.service.js";
import { productService } from "#product/product.service.js";
import { contactService } from "#contact/contact.service.js";

export const adminSSRservice = {
    async categories(id) {
        const categories = await categoryService.getAll();
        const staff = await staffService.getNameById({ id });

        return { staff, categories };
    },
    
    async getFirstCategory() {
        return categoryService.getFirst();
    },

    async menu({ id, categoryId }) {
        const categories = await categoryService.getById({ id: categoryId });
        const products = await productService.getByCategory({ id: categoryId });
        const staff = await staffService.getNameById({ id });

        return { staff, products, categories };
    },

    async contacts(id) {
        const contacts = await contactService.getAll();
        const staff = await staffService.getNameById({ id });

        return { staff, contacts };
    }
}