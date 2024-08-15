const {Module} = require("@nestjs/common");
const {ArticleController} = require("./article.controller");
const {ArticleService} = require("./article.service");

@Module({
    controllers: [ArticleController],
    providers: [ArticleService],
    })
export class ArticleModule {}
