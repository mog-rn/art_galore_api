import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSheetsService } from './payment-sheets.service';

describe('PaymentSheetsService', () => {
  let service: PaymentSheetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentSheetsService],
    }).compile();

    service = module.get<PaymentSheetsService>(PaymentSheetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
