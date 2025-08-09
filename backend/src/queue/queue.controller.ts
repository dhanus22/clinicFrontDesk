import { Controller, Post, Body, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { QueueService } from './queue.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  addPatient(@Body('patientName') patientName: string) {
    return this.queueService.addPatient(patientName);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.queueService.updateStatus(id, status);
  }

  @Get()
  getAll() {
    return this.queueService.getAll();
  }
}
