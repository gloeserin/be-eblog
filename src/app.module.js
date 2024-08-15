const {Module} = require("@nestjs/common")
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { CategoryController } from './category/category.controller';
import { ArticleController } from './article/article.controller';
import { PrismaService } from './prisma.service';
import { AuthorizationMiddleware } from './middleware/auth.middleware'
import { UserService } from './user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
export const jwtSecret = 'zjP9h6ZI5LoSKCRj';
import { RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '../node_modules/@nestjs/common/index';
import { CommentsController } from './comments/comments.controller';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '5m' }, // e.g. 30s, 7d, 24h
    }),

  ],
  controllers: [AppController, UserController, ArticleController, CategoryController, CommentsController, CommentsController],
  providers: [AppService, PrismaService, UserService],

})
export class AppModule {
  configure(consumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude(
        { path: '/user', method: RequestMethod.POST },
        { path: '/user/login', method: RequestMethod.POST },
        {
          path: '/uploads/(.*)', method: RequestMethod.ALL
        }
      )
      .forRoutes('*');
  }
}

