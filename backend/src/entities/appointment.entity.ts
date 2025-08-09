// src/entities/appointment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from './doctor.entity';
import { User } from './user.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Doctor)
  doctor: Doctor;

  @ManyToOne(() => User)
  patient: User;

  @Column()
  time: string;

  @Column()
  status: string; // "booked", "cancelled", "completed"
}
