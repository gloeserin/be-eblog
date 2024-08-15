import { Controller,Post,Put,Get,Bind,Req,Res,Delete } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(){
        this.categoryService = new CategoryService();
    }

    @Post()
    @Bind(Req(),Res())
    async createCategory(req,res) {
        try {
            const category = await this.categoryService.createCategory(req.body);
            return res.status(201).json(category);
        }catch (e) {
            return res.status(400).json({error:e.message});

        }
        
    }


    @Get()
    @Bind(Res())
    async getCategories(res) {
        try {
            const categories = await this.categoryService.getAllCategories();
            return res.status(200).json(categories);
        }catch (e) {
            return res.status(400).json({error:e.message});
        }
    }

    @Get(':id')
    @Bind(Req(),Res())
    async getCategory(req,res) {
        try {
            const category = await this.categoryService.getCategory(req.params.id);
            return res.status(200).json(category);
        }catch (e) {
            return res.status(400).json({error:e.message});
        }
    }

    @Put(':id')
    @Bind(Req(),Res())
    async updateCategory(req,res) {
        try {
            const category = await this.categoryService.updateCategory(req.params.id,req.body);
            return res.status(200).json(category);
        }catch (e) {
            return res.status(400).json({error:e.message});
        }
    }

    @Delete(':id')
    @Bind(Req(),Res())
    async deleteCategory(req,res) {
        try {
            const category = await this.categoryService.deleteCategory(req.params.id);
            return res.status(200).json(category);
        }catch (e) {
            return res.status(400).json({error:e.message});
        }
    }


}
