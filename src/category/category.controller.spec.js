import { Test } from '@nestjs/testing';
import { CategoryController } from './category.controller';

describe('Category Controller', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CategoryController],
    }).compile();

    controller = module.get(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
