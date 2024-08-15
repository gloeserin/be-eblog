import { PrismaClient } from '@prisma/client';
import bcryptjs from "bcryptjs";
class UserService {
    constructor() {
        this.prisma = new PrismaClient();
    }
  
    async createUser(userData) {
      return this.prisma.user.create({ data: userData });
    }

    async login(userData) {
        const user = await this.prisma.user.findUnique({where:{email:userData.email}});
        if(!user) {
            throw new Error('User not found');
        }
        const isMatch = bcryptjs.compareSync(userData.password, user.password);
        if(!isMatch) {
            throw new Error('Password is incorrect');
        }
        return user;
    }
  
    async getUser(id) {
      return this.prisma.user.findUnique({ where: { id: Number(id) } });
    }
  
    async getAllUsers() {
      return this.prisma.user.findMany();
    }
  
    async updateUser(id, userData) {
      return this.prisma.user.update({
        where: { id: Number(id) },
        data: userData,
      });
    }
  
    async deleteUser(id) {
      return this.prisma.user.delete({ where: { id: Number(id) } });
    }

    async switchUserRole(id) {
        const user = await this.prisma.user.findUnique({where:{id:Number(id)}});
        if(user.role === 'admin') {
            return this.prisma.user.update({
                where: { id: Number(id) },
                data: {role:'user'},
              });
        } else {
            return this.prisma.user.update({
                where: { id: Number(id) },
                data: {role:'admin'},
              });
        }
    }
  }
  
  module.exports = { UserService };
  