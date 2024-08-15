import { Module } from "@nestjs/common";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";

@Module({
    controllers: [ArticleController],
    providers: [ArticleService],
    })
export class ArticleModule {}//coba tambahin ke si article say apanyaa? ubikin file module kayak gini buat si article
