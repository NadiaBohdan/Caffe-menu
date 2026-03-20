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

        const category = await categoryRepository.create(data);
        if(!category) throw new ApiError(500, "Create error");

        return category;
    }
}