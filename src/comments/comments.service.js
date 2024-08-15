import { PrismaClient } from '@prisma/client';
class CommentsService {
    constructor() {
        this.prisma = new PrismaClient();
    }
  
    async createComments(comments) {
      return this.prisma.comments.create({ data: comments });
    }

    async getComments(id) {
      return this.prisma.comments.findUnique({ where: { id: Number(id) } });
    }
  
    async getAllComments() {
      return this.prisma.comments.findMany();
    }
  
    async updateComments(id, comments) {
      return this.prisma.comments.update({
        where: { id: Number(id) },
        data: comments,
      });
    }
  
    async deleteComments(id) {
      return this.prisma.comments.delete({ where: { id: Number(id) } });
    }
  }
  
  module.exports = { CommentsService };
  