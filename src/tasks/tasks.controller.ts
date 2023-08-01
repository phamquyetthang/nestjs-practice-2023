import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Response,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTask, GetTaskDto } from './dto/index.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  createTask(@Body() body: CreateTask) {
    return this.taskService.createTask(body);
  }

  @Get()
  getAllTasks(@Query() query?: GetTaskDto) {
    return this.taskService.getAllTask(query);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(Number(id));
  }

  @Put(':id')
  editTask(@Param('id') id: string, @Body() body: CreateTask) {
    return this.taskService.editTask(Number(id), body);
  }

  @Patch(':id')
  changeStatusTask(@Param('id') id: string) {
    return this.taskService.changeStatusTask(Number(id));
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string) {
    return this.taskService.deleteTaskById(Number(id));
  }
}
