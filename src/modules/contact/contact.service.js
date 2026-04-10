import { contactRepository } from "./contact.repository.js";

export const contactService = {
    async sync(contactsArray) {
        const result = await contactRepository.sync(contactsArray);
        return result;
    }
}