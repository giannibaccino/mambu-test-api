import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { MambuService } from '../services/mambu.service';

@Controller('mambu')
export class MambuController {

    constructor(
        private readonly mambuService: MambuService
    ) {}

    /*--- CLIENTS ---*/
    @Get('/clients/:limit/:offset')
    async getClients(@Param('limit') limit: number,  @Param('offset') offset: number) {
        const clients = await this.mambuService.getClients(limit, offset);
        return clients
    }

    @Get('/clients/:id')
    async getClientById(@Param('id') id: string) {
        const client = await this.mambuService.getClientById(id);
        return client
    }

    @Post('/clients/add')
    async createClient(@Body() clientData: any) {
        const client = await this.mambuService.createClient(clientData);
        return client;
    }

    @Patch('/clients/:id/approve')
    async approveClient(@Param('id') id: string) {
        const client = await this.mambuService.setClientToPendingApproval(id);
        return client;
    }

    /*--- LOANS ---*/

    @Get('/loans/:id')
    async geLoanById(@Param('id') id: string) {
        const loan = this.mambuService.getLoanById(id);
        return loan;
    }

    @Post('/loans/create')
    async createLoan(@Body() loanData: any) {
        const loan = await this.mambuService.createLoan(loanData);
        return loan;
    }

    @Post('/loans/approve/:id')
    async approveLoan(@Param('id') id: string) {
        const loan = this.mambuService.approveLoanAccount(id);
        return loan;
    }

    @Post('/loans/disburst/:id')
    async disburtLoan(@Param('id') id: string, @Body() disburment: any) {
        const loan = this.mambuService.disburtLoan(id, disburment);
        return loan;
    }

    @Post('/loans/repay/:id')
    async repayLoan(@Param('id') id: string, @Body() repayment: any) {
        const loan = this.mambuService.repayLoan(id, repayment);
        return loan;
    }
}
