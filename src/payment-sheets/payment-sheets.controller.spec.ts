import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSheetsController } from './payment-sheets.controller';
import { PaymentSheetsService } from './payment-sheets.service';

describe('PaymentSheetsController', () => {
  let controller: PaymentSheetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentSheetsController],
      providers: [PaymentSheetsService],
    }).compile();

    controller = module.get<PaymentSheetsController>(PaymentSheetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
