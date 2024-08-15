import { Controller, Post, Put, Get, Bind, Req, Res, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ArticleService } from './article.service';
import { JwtService } from '@nestjs/jwt';
import upload from '../multerArticle.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { jwtSecret } from '../app.module';

@Controller('article')
export class ArticleController {
    constructor() {
        this.articleService = new ArticleService();
        this.jwtService = new JwtService();
    }
    @Post()
    @UseInterceptors(FileInterceptor('cover', { storage: upload.storage, fileFilter: upload.fileFilter }))
    @Bind(UploadedFile(), Req(), Res())
    async createArticle(file, req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = this.jwtService.verify(token, { secret: jwtSecret });
            const cover = file.filename;
            req.body.cover = cover;
            req.body.category_id = parseInt(req.body.category_id);
            req.body.user_id = user.userId;
            req.body.slug = req.body.title.toLowerCase().split(' ').join('-');
            const article = await this.articleService.createArticle(req.body);
            return res.status(201).json(article);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Get("/user")
    @Bind(Req(), Res())
    async getArticleByUserId(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = this.jwtService.verify(token, { secret: jwtSecret });
            const articles = await this.articleService.getUserArticle(user.userId);
            return res.status(200).json(articles);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Get("/latest")
    @Bind(Req(), Res())
    async getLatestArticles(req, res) {
        try {
            const limit = parseInt(req.query.limit);
            const articles = await this.articleService.getLatestArticle(limit);
            return res.status(200).json(articles);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Get("")
    @Bind(Res())
    async getArticles(res) {
        try {
            const articles = await this.articleService.getAllArticles();
            return res.status(200).json(articles);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Get(':id')
    @Bind(Req(), Res())
    async getArticle(req, res) {
        try {
            const article = await this.articleService.getArticle(req.params.id);
            return res.status(200).json(article);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    

    @Get('/slug/:slug')
    @Bind(Req(), Res())
    async getArticleBySlug(req, res) {
        try {
            const article = await this.articleService.getArticleBySlug(req.params.slug);
            return res.status(200).json(article);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Get(':id')
    @Bind(Req(), Res())
    async getArticle(req, res) {
        try {
            const article = await this.articleService.getArticle(req.params.id);
            return res.status(200).json(article);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('cover', { storage: upload.storage, fileFilter: upload.fileFilter }))
    @Bind(UploadedFile(), Req(), Res())
    async updateArticle(file, req, res) {
        try {
            const cover = file.filename;
            req.body.cover = cover;
            req.body.category_id = parseInt(req.body.category_id);
            req.body.slug = req.body.title.toLowerCase().split(' ').join('-');

            const article = await this.articleService.updateArticle(req.params.id, req.body);
            return res.status(200).json(article);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Delete(':id')
    @Bind(Req(), Res())
    async deleteArticle(req, res) {
        try {
            await this.articleService.deleteArticle(req.params.id);
            return res.status(200).json({ message: 'Article deleted' });
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    
}
