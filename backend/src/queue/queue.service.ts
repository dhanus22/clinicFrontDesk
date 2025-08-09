import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from '../entities/queue.entity';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private queueRepository: Repository<Queue>,
  ) {}

  async addPatient(patientName: string) {
    const last = await this.queueRepository.find({
      order: { queueNumber: 'DESC' },
      take: 1,
    });
    const nextNumber = last.length > 0 ? last[0].queueNumber + 1 : 1;

    const patient = this.queueRepository.create({
      patientName,
      queueNumber: nextNumber,
      status: 'waiting',
    });
    return this.queueRepository.save(patient);
  }

  async updateStatus(id: number, status: string) {
    await this.queueRepository.update(id, { status });
    return this.queueRepository.findOne({ where: { id } });
  }

  async getAll() {
    return this.queueRepository.find({ order: { queueNumber: 'ASC' } });
  }
}
