import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsGateway } from './payments.gateway';
import { PaymentsService } from './payments.service';

describe('PaymentsGateway', () => {
  let gateway: PaymentsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsGateway, PaymentsService],
    }).compile();

    gateway = module.get<PaymentsGateway>(PaymentsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
