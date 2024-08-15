import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
    const admin = await prisma.user.create({
        data: {
            email: 'admin@gmail.com',
            username: 'admin',
            name:"Admin",
            password: hashSync('admin123', 10),
            role: 'admin',
        },
    })
    console.log(admin)

}
main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
