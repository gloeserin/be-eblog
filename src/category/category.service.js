import { PrismaClient } from '@prisma/client';
class CategoryService {
    constructor() {
        this.prisma = new PrismaClient();
    }
  
    async createCategory(category) {
      return this.prisma.category.create({ data: category });
    }

    async getCategory(id) {
      return this.prisma.category.findUnique({ where: { id: Number(id) } });
    }
  
    async getAllCategories() {
      return this.prisma.category.findMany();
    }
  
    async updateCategory(id, category) {
      return this.prisma.category.update({
        where: { id: Number(id) },
        data: category,
      });
    }
  
    async deleteCategory(id) {
      return this.prisma.category.delete({ where: { id: Number(id) } });
    }
  }
  
  module.exports = { CategoryService };
  