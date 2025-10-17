import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';


@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
constructor(private readonly tasks: TasksService) {}


@Get()
list(@Req() req: any) {
return this.tasks.listByUser(req.user.sub);
}


@Get(':id')
get(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
return this.tasks.get(req.user.sub, id);
}


@Post()
create(@Req() req: any, @Body() dto: CreateTaskDto) {
return this.tasks.create(req.user.sub, dto);
}


// Admin-only example
@Delete(':id')
@Roles('ADMIN')
remove(@Param('id', ParseIntPipe) id: number) {
return this.tasks.deleteById(id);
}
}