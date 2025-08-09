import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { Doctor } from '../entities/doctor.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async bookAppointment(doctorId: number, patientId: number, time: string) {
    const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
    const patient = await this.userRepo.findOne({ where: { id: patientId } });
    if (!doctor || !patient) throw new Error('Doctor or patient not found');

    const appointment = this.appointmentRepo.create({
      doctor,
      patient,
      time,
      status: 'booked',
    });
    return this.appointmentRepo.save(appointment);
  }

  async reschedule(id: number, time: string) {
    await this.appointmentRepo.update(id, { time, status: 'booked' });
    return this.appointmentRepo.findOne({ where: { id } });
  }

  async cancel(id: number) {
    await this.appointmentRepo.update(id, { status: 'cancelled' });
    return this.appointmentRepo.findOne({ where: { id } });
  }

  async getAllForDoctor(doctorId: number) {
    return this.appointmentRepo.find({
      where: { doctor: { id: doctorId } },
      relations: ['doctor', 'patient'],
    });
  }

  async getAllForPatient(patientId: number) {
    return this.appointmentRepo.find({
      where: { patient: { id: patientId } },
      relations: ['doctor', 'patient'],
    });
  }
}
