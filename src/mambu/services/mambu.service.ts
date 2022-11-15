import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { MAMBU_API_KEY, MAMBU_URL } from 'src/config/constants';

@Injectable()
export class MambuService {

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {}

    /*--- MAMBU ACCESS ---*/
    private mambuHeaders = {
        Accept: 'application/vnd.mambu.v2+json',
        apikey: this.configService.get<string>(MAMBU_API_KEY),
    };

    /*--- CLIENTS ---*/
    async getClients(limit: number, offset: number) {
        const url = this.configService.get<string>(MAMBU_URL) + 
        `/clients?offset=${offset}&limit=${limit}&paginationDetails=OFF&detailsLevel=FULL`;


        return await lastValueFrom(
            this.httpService.get(url, {headers: this.mambuHeaders})
            .pipe(map(clts => clts.data))
        );
        
    }

    async getClientById(id: string) {
        const url = this.configService.get<string>(MAMBU_URL) + 
        `/clients/${id}?detailsLevel=FULL`;

        return await lastValueFrom(
            this.httpService.get(url, {headers: this.mambuHeaders})
            .pipe(map(clt => clt.data))
        );
    }

    async createClient(clientData: any) {
        const url = this.configService.get<string>(MAMBU_URL) + 
        `/clients`;

        return await lastValueFrom(
            this.httpService.post(url, clientData, {headers: this.mambuHeaders})
            .pipe(map(clt => clt.data))
        );

    }

    async setClientToPendingApproval(id: string) {
        const url = this.configService.get<string>(MAMBU_URL) + 
        `/clients/${id}`;

        const body = [
            {
                "op": "REPLACE",
                "path": "state",
                "value": "PENDING_APPROVAL"
            }
        ];

        return await lastValueFrom(
            this.httpService.patch(url, body, {headers: this.mambuHeaders})
            .pipe(map(clt => clt.data))
        );
    }

    /*--- LOANS ---*/

    async getLoanById(id: string) {
        const url = this.configService.get<string>(MAMBU_URL) + 
        `/loans/${id}`;

        return await lastValueFrom(
            this.httpService.get(url, {headers: this.mambuHeaders})
            .pipe(map(loan => loan.data))
        );
    }

    async createLoan(loanData: any) {
        const url = this.configService.get<string>(MAMBU_URL) + 
        '/loans/';

        return await lastValueFrom(
            this.httpService.post(url, loanData, {headers: this.mambuHeaders})
            .pipe(map(loan => loan.data))
        );
    }

    async approveLoanAccount(id: string) {
        const url = this.configService.get<string>(MAMBU_URL) + 
        `/loans/${id}:changeState`;

        const body = {
            action: 'APPROVE',
            notes: 'Loan approved'
        }

        return await lastValueFrom(
            this.httpService.post(url, body, {headers: this.mambuHeaders})
            .pipe(map(loan => loan.data))
        );
    }

    async disburtLoan(id: string, disbursment: any) {
        const url = this.configService.get<string>(MAMBU_URL) + 
        `/loans/${id}/disbursement-transactions`;

        return await lastValueFrom(
            this.httpService.post(url, disbursment, {headers: this.mambuHeaders})
            .pipe(map(loan => loan.data))
        );
    }

    async repayLoan(id: string, repayment: any) {
        const url = this.configService.get<string>(MAMBU_URL) + 
        `/loans/${id}/repayment-transactions`;

        return await lastValueFrom(
            this.httpService.post(url, repayment, {headers: this.mambuHeaders})
            .pipe(map(loan => loan.data))
        );
    }

}
