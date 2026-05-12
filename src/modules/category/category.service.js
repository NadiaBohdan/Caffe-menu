import { categoryRepository } from "./category.repository.js";
import { ApiError } from "#utils/error.util.js";

export const categoryService = {

    /**
     * @param {Object} data
     * @param {string} data.title
     */

    async addCategory(data) {
        const isExists = await categoryRepository.getByTitle(data.title);
        if(isExists) throw new ApiError(409, "Category with same title already exists");

        const category = await categoryRepository.create(data);
        if(!category) throw new ApiError(500, "Create error");

        return category;
    },

    async getAll() {
        return await categoryRepository.getAll();
    },

    /**
     * @param {object} data
     * @param {number} data.id 
     */

    async getFirst() {
        const category = await categoryRepository.getFirst();
        return category;
    },

    async getById({ id }) {
        const category = await categoryRepository.getById(id);
        if(!category) throw new ApiError(404, `Category with id: ${id} do not exists`)

        return category;
    },

    /**
     * @param {Array} categoryList
     */

    async updateCategories(categoryList) {      
        const categoriesList = await categoryRepository.update(categoryList);

        return categoriesList;
    },

    /**
     * @param {object} data
     * @param {number} data.id 
     */

    async deleteCategory({ id }) {
        const category = await categoryRepository.delete(id);

        return category
    }
}