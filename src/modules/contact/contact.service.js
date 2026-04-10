import { contactRepository } from "./contact.repository.js";

export const conatectService = {
    async sync(contactsArray) {
        const result = await contactRepository.sync(contactsArray);
        return result;
    }
}