const {Module} = require("@nestjs/common");
const {CommentsController} = require("./comments.controller");
const {CommentsService} = require("./comments.service");

@Module({
    controllers: [CommentsController],
    providers: [CommentsService],
    })
export class CategoryModule {}
