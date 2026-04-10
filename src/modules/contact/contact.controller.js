import { contactService } from "./contact.service.js";

export const contactController = {
    async sync(req, res) {
        await contactService.sync(req.body);
        res.render('/admin/contacts')
    }
}