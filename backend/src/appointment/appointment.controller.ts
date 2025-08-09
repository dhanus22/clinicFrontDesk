import { Controller, Post, Patch, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('book')
  book(@Body() body: { doctorId: number; patientId: number; time: string }) {
    return this.appointmentService.bookAppointment(body.doctorId, body.patientId, body.time);
  }

  @Patch(':id/reschedule')
  reschedule(@Param('id') id: number, @Body('time') time: string) {
    return this.appointmentService.reschedule(id, time);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: number) {
    return this.appointmentService.cancel(id);
  }

  @Get('doctor/:doctorId')
  getForDoctor(@Param('doctorId') doctorId: number) {
    return this.appointmentService.getAllForDoctor(doctorId);
  }

  @Get('patient/:patientId')
  getForPatient(@Param('patientId') patientId: number) {
    return this.appointmentService.getAllForPatient(patientId);
  }
}
