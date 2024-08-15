import { Test } from '@nestjs/testing';
import { ArticleController } from './article.controller';

describe('Article Controller', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ArticleController],
    }).compile();

    controller = module.get(ArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
