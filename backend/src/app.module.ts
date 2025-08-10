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
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'clinic_db',
      entities: [User, Doctor, Appointment, Queue],
      synchronize: true, // Keep true only during development
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Doctor, Appointment, Queue]),
    AuthModule,
    QueueModule,
    AppointmentModule,
    DoctorModule,
  ],
  providers: [UsersService],
})
export class AppModule {}
