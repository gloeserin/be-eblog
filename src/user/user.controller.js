import { Controller, Get, Post, Req, Put, Delete, Res, Bind, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import upload from '../multer.config';
import bcryptjs from 'bcryptjs';
import { jwtSecret } from '../app.module';

@Controller('user')
export class UserController {
    constructor() {
        this.userService = new UserService();
        this.jwtService = new JwtService();
    }

    @Get()
    @Bind(Res())
    async getAllUsers(res) {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json(users);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Post("/role/:id")
    @Bind(Req(), Res())
    async switchUserRole(req, res) {
        try {
            const user = await this.userService.switchUserRole(req.params.id);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }


    @Post()
    @Bind(Req(), Res())
    async createUser(req, res) {
        try {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
            req.body.role = 'user';
            const user = await this.userService.createUser(req.body);
            return res.status(201).json(user);

        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Post('login')
    @Bind(Req(), Res())
    async login(req, res) {
        try {
            const user = await this.userService.login(req.body);
            const token = this.jwtService.sign(
                { userId: user.id, email: user.email },
                { secret: jwtSecret }
            );
            return res.status(200).json({ user, token });

        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Put(":id")
    @UseInterceptors(FileInterceptor('img', { storage: upload.storage, fileFilter: upload.fileFilter }))
    @Bind(UploadedFile(), Req(), Res())
    async updateUser(img, req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (img) {
                const imgPath = img.filename;
                req.body.img = imgPath;
            } else {
                delete req.body.img;
            }
            if (!req.body.username || req.body.username === '') {
                delete req.body.username;
            }
            if (!req.body.name || req.body.name === '') {
                delete req.body.name;
            }
            const updatedUser = await this.userService.updateUser(req.params.id, req.body);
            return res.status(200).json(updatedUser);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    @Delete(':id')
    @Bind(Req(), Res())
    async deleteUser(req, res) {
        try {
            const user = await this.userService.deleteUser(req.params.id);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }
}
