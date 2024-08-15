const {Module} = require("@nestjs/common");
const {CategoryController} = require("./category.controller");
const {CategoryService} = require("./category.service");

@Module({
    controllers: [CategoryController],
    providers: [CategoryService],
    })
export class CategoryModule {}//coba tambahin ke si article say apanyaa? ubikin file module kayak gini buat si article
