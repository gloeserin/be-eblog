import { Controller, Post, Put, Get, Bind, Req, Res, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../app.module';

@Controller('comments')
export class CommentsController {
    constructor() {
        this.commentsService = new CommentsService();
        this.jwtService = new JwtService();
    }

    @Post()
    @Bind(Req(), Res())
    async createComments(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = this.jwtService.verify(token, { secret: jwtSecret });
            req.body.user_id = user.userId;
            req.body.article_id = parseInt(req.body.article_id);
            const comments = await this.commentsService.createComments(req.body);
            return res.status(201).json(comments);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Get()
    @Bind(Res())
    async getComments(res) {
        try {
            const comments = await this.commentsService.getAllComments();
            return res.status(200).json(comments);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Get(':id')
    @Bind(Req(), Res())
    async getComments(req, res) {
        try {
            const comments = await this.commentsService.getComments(req.params.id);
            return res.status(200).json(comments);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Put(':id')
    @Bind(Req(), Res())
    async updateComments(req, res) {
        try {
            const comments = await this.commentsService.updateComments(req.params.id, req.body);
            return res.status(200).json(comments);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Delete(':id')
    @Bind(Req(), Res())
    async deleteComments(req, res) {
        try {
            const comments = await this.commentsService.deleteComments(req.params.id);
            return res.status(200).json(comments);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }


}
