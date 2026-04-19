import { hashPassword } from "#utils/hash.util.js";
import { staffRepository } from "#staff/staff.repository.js";
import dotenv from "dotenv";
import prisma from "#configs/prisma.js";

dotenv.config();

const createSuperAdmin = async () => {
    try {
        const login = process.env.SUPER_ADMIN_LOGIN
        const password = await hashPassword(process.env.SUPER_ADMIN_PASSWORD);

        const isExist = await staffRepository.getByLogin(login);

        if(isExist) {
            console.log("[ INFO ]: Super admin already exist. Skipping...");
            return;
        }

        await staffRepository.create({ login, password, role: 'admin' });

        console.log("[ INFO ]: Super admin created");
    } catch(err) {
        console.error("[ ERROR ]: Error craeting super admin: ", err);
    } finally {
        await prisma.$disconnect()
    }
}

createSuperAdmin();