import { staffRepository } from "./staff.repository.js";
import { ApiError } from "#utils/error.util.js";
import { hashPassword } from "#utils/hash.util.js";

export const staffService = {
    async add(data) {
        const isExist = await staffRepository.getByLogin(data.login);
        if(isExist) throw new ApiError(409, "Employee with same login already exists");

        data.password = await hashPassword(data.password);

        const staff = await staffRepository.create(data);
        return staff;
    },

    async getAll() {
        const staffArray = await staffRepository.getAll();
        return staffArray;
    },

    async getByIdentifier({ login }) {
        const staff = await staffRepository.getByLogin(login);
        return staff;
    },

    async update(data) {
        const isExist = await staffRepository.getByLogin(data.login);
        if(isExist && isExist.id !== data.id) throw new ApiError(409, "Employee with same login already exists");

        if(data.password) {
            data.password = await hashPassword(data.password)
        }

        const staff = await staffRepository.update(data);
        return staff;
    },

    async delete({ id }) {
        const result = await staffRepository.delete(id);
        return result;
    }
}