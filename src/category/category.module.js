
import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

@Module({
    controllers: [CategoryController],
    providers: [CategoryService],
    })
export class CategoryModule {}//coba tambahin ke si article say apanyaa? ubikin file module kayak gini buat si article
