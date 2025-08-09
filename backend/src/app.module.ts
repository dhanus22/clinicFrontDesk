import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Doctor } from './entities/doctor.entity';
import { Appointment } from './entities/appointment.entity';
import { Queue } from './entities/queue.entity';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { QueueModule } from './queue/queue.module';
import { AppointmentModule } from './appointment/appointment.module';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorService } from './doctor/doctor.service';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3309,
      username: 'root',
      password: 'saidhanu31',
      database: 'clinic_db',
      entities: [User, Doctor, Appointment, Queue],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Doctor, Appointment, Queue]),
    AuthModule,
    QueueModule,
    AppointmentModule,
    DoctorModule
  ],
  providers: [UsersService],
})
export class AppModule {}
