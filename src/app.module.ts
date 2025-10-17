import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';


@Module({
imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, TasksModule],
providers: [PrismaService],
})
export class AppModule {}