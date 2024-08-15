import { PrismaClient } from '@prisma/client';
class ArticleService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createArticle(article) {
    return this.prisma.articles.create({ data: article });
  }

  async getArticle(id) {
    return this.prisma.articles.findUnique({
      where: { id: Number(id) }, include: {
        category: true,
        comments: true,
      }
    });
  }

  async getLatestArticle(amount) {

    return this.prisma.articles.findMany({
      take: Number(amount),
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        category: true,
        comments: {
          include: {
            user: true
          }
        }
      }
    });
  }
  async getArticleBySlug(slug) {
    return this.prisma.articles.findUnique({
      where: { slug: slug }, include: {
        category: true,
        comments: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async getAllArticles() {
    return this.prisma.articles.findMany({
      include: {
        user: true,
        category: true,
        comments: {
          include: {
            user: true
          }
        }
      },
    });
  }

  async getUserArticle(id) {
    return this.prisma.articles.findMany({
      where: { user_id: id },
      include: {
        category: true,
        comments: true,
      },
    });
  }

  async updateArticle(id, article) {
    console.log(article, id);
    return this.prisma.articles.update({
      where: { id: Number(id) },
      data: article,
    });
  }

  async deleteArticle(id) {
    return this.prisma.articles.delete({ where: { id: Number(id) } });
  }
}

module.exports = { ArticleService };
