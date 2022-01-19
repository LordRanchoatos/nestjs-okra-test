import { Controller, Get, Post, Param } from '@nestjs/common';
import { OkraService } from './okra.service';
import { accountIdDto } from './dto/accountId.dto';

@Controller('okra')
export class OkraController {
  constructor(private readonly okraService: OkraService) {}

  @Get('/:id/transactions')
  async getTrax(@Param('id') id: accountIdDto): Promise<any> {
    return this.okraService.getTrax(id);
  }

  @Get('banks')
  async getBanks(): Promise<any> {
    const banks = await this.okraService.getBanks();
    return banks;
  }

  @Get('customers')
  async getCustomers(): Promise<any> {
    const customers = await this.okraService.getCustomers();
    return customers;
  }

  @Post('connect')
  async connectCustomer(): Promise<any> {
    const link = await this.okraService.connectCustomer();
    if (!link) {
      return 'error linking with okra';
    }

    return 'Link successful';
  }

  @Get('/:id/balance')
  async getBalance(@Param('id') id: accountIdDto): Promise<any> {
    const balance = await this.okraService.fetchBalance(id);
    return balance;
    // balance.catch((err) => {
    //   return err;
    // });
    // balance.then((response) => {
    //   return response;
    // });
  }

  @Post('/:id/charge')
  chargeCustomer(): string {
    return this.okraService.ChargeCustomer();
  }

  @Post('/:id/futurepay')
  futurePayment(): string {
    return this.okraService.futurePayment();
  }
}
