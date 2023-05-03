import { Test, TestingModule } from '@nestjs/testing';
import { ImgUpload } from './img-upload';

describe('ImgUpload', () => {
  let provider: ImgUpload;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImgUpload],
    }).compile();

    provider = module.get<ImgUpload>(ImgUpload);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
