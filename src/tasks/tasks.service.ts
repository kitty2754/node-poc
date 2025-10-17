import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';


@Injectable()
export class TasksService {
constructor(private prisma: PrismaService) {}


listByUser(userId: number) {
return this.prisma.task.findMany({ where: { userId }, orderBy: { id: 'desc' } });
}


async get(userId: number, id: number) {
const task = await this.prisma.task.findFirst({ where: { id, userId } });
if (!task) throw new NotFoundException();
return task;
}


create(userId: number, dto: CreateTaskDto) {
return this.prisma.task.create({ data: { ...dto, userId } });
}


// Example admin-only delete
deleteById(id: number) {
return this.prisma.task.delete({ where: { id } });
}
}