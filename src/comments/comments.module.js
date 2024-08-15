import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";

@Module({
    controllers: [CommentsController],
    providers: [CommentsService],
    })
export class CategoryModule {}//coba tambahin ke si article say apanyaa? ubikin file module kayak gini buat si article
