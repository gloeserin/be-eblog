import { Test } from '@nestjs/testing';
import { CommentsController } from './comments.controller';

describe('Comments Controller', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CommentsController],
    }).compile();

    controller = module.get(CommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
