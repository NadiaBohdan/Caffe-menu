import { categoryRepository } from "./category.repository.js";
import { categoryIdDto, createCategoryDto, updateCategoryDto } from "./categoty.dto.js";
import { ApiError } from "#utils/error.util";

export const categoryService = {

    /**
     * @param {Object} data
     * @param {string} data.title
     * @param {Number} data.sortOrder 
     */

    async addCategory(data) {
        createCategoryDto.parse(data);

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
     * @param {string} rawId 
     */

    async getById(rawId) {
        const { id } = categoryIdDto.parse({ id: rawId });

        //@ts-ignore
        const category = await categoryRepository.getById(id);
        if(!category) throw new ApiError(404, `Category with id: ${id} do not exists`)

        return category;
    },

    /**
     * @param {Array} categoryList
     */

    async updateCategories(categoryList) {
        const parsedData = categoryList.map(category => updateCategoryDto.parse(category));
        
        //@ts-ignore
        const categoriesList = await categoryRepository.update(parsedData);

        return categoriesList;
    },

    /**
     * @param {string} rawId 
     */

    async deleteCategoty(rawId) {
        const { id } = categoryIdDto.parse({ id: rawId });

        //@ts-ignore
        const category = await categoryRepository.delete(id);

        return category
    }
}