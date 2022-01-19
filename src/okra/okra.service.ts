import { Injectable } from '@nestjs/common';
import * as okra_client from 'okra-node';
import { HttpService } from '@nestjs/axios';
import { accountIdDto } from './dto/accountId.dto';
// import { ConfigService } from '@nestjs/config';

const accessToken = '3e5893c8-492a-54eb-a5d6-a2aeb051c8f9';

@Injectable()
export class OkraService {
  // private readonly url: string;

  // private readonly MONO_SEC_KEY: string;

  // private readonly HEADERS: any;
  constructor(
    private readonly axios: HttpService, //private readonly configService: ConfigService,
  ) {
    // this.url = this.configService.get<string>('OKRA_BASE_URL');
    // this.key = this.configService.get<string>('OKRA_SECRET_KEY');
    // this.HEADERS = {
    //   Accept: 'application/json; charset=utf-8',
    //   'content-Type': 'application/json',
    //   Authorization:
    //     `Bearer ${this.key}`,
    //   };
  }

  async connectCustomer(): Promise<any> {
    okra_client.getAuth(accessToken, {}, (err, results) => {
      // Handle err
      if (err) {
        console.log('something went wrong');
      } else {
        const auths = results.auths;
        return auths;
      }
    });
  }

  async getBanks(): Promise<any> {
    let banks = new Promise((resolve, reject) => {
      this.axios
        .get('https://api.okra.ng/v2/banks/list', {
          headers: { 'content-Type': 'application/json' },
        })
        .subscribe({
          next: (response) => resolve(response.data),
          error: (error) => reject(error.response),
        });
    });
    return banks;
  }

  async getCustomers(): Promise<any> {
    let customers = new Promise((resolve, reject) => {
      this.axios
        .post('https://api.okra.ng/v2/customers/list', {
          headers: {
            Accept: 'application/json; charset=utf-8',
            'content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI0ZWIyNzU4MmM3MjE3NGY4MDBlMGIiLCJpYXQiOjE2MjI0Njk0MTZ9.wwwwCV0dqMC0H_WQhkFVdU4pqEAMncjWgrPhC5nGmn0',
          },
        })
        .subscribe({
          next: (response) => resolve(response.data),
          error: (error) => reject(error.response),
        });
    });
    return customers;
  }

  async fetchBalance(id: accountIdDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.axios
        .post(
          'https://api.okra.ng/v2/balance/getByCustomer',
          { customer: id },
          {
            headers: {
              Accept: 'application/json; charset=utf-8',
              'content-Type': 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI0ZWIyNzU4MmM3MjE3NGY4MDBlMGIiLCJpYXQiOjE2MjI0Njk0MTZ9.wwwwCV0dqMC0H_WQhkFVdU4pqEAMncjWgrPhC5nGmn0',
            },
          },
        )
        .subscribe({
          next: (response) => resolve(response.data),
          error: (error) => reject(error.response.data),
        });
    });
  }

  ChargeCustomer(): string {
    return 'charge a specified anount from customers balance';
  }

  getTrax(id: accountIdDto): Promise<any> {
    let transactions = new Promise((resolve, reject) => {
      this.axios
        .post(
          'https://api.okra.ng/v2/transactions/getByCustomer',
          { customer: id },
          {
            headers: {
              Accept: 'application/json; charset=utf-8',
              'content-Type': 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI0ZWIyNzU4MmM3MjE3NGY4MDBlMGIiLCJpYXQiOjE2MjI0Njk0MTZ9.wwwwCV0dqMC0H_WQhkFVdU4pqEAMncjWgrPhC5nGmn0',
            },
          },
        )
        .subscribe({
          next: (response) => {
            resolve(response.data);
          },
          error: (error) => reject(error.response),
        });
    });
    return transactions;
  }

  futurePayment(): string {
    return 'this payment will be process in future';
  }
}
