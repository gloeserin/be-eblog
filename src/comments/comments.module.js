const {Module} = require("@nestjs/common");
const {CommentsController} = require("./comments.controller");
const {CommentsService} = require("./comments.service");

@Module({
    controllers: [CommentsController],
    providers: [CommentsService],
    })
export class CategoryModule {}//coba tambahin ke si article say apanyaa? ubikin file module kayak gini buat si article
