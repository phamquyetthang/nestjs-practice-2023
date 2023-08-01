import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateTask, GetTaskDto, Tasks } from './dto/index.dto';

@Injectable()
export class TasksService {
  tasks: Array<Tasks> = [];

  createTask(data: CreateTask) {
    this.tasks.push({
      ...data,
      id: new Date().getTime(),
    });
    return this.tasks.slice(-1);
  }

  getAllTask(query?: GetTaskDto) {
    if (query?.page && query?.pageSize) {
      const { page, pageSize } = query;
      const start = Number(page) * Number(pageSize);
      const end = start + Number(pageSize);
      return {
        data: this.tasks.slice(start, end),
        meta: { total: this.tasks.length },
      };
    } else {
      throw new BadRequestException('paging is required');
    }
  }

  getTaskById(id: number) {
    if (!id) {
      throw new BadRequestException('Id is required!');
    }
    return this.tasks.find((task) => task.id === id);
  }

  editTask(id: number, data: CreateTask) {
    if (!id) {
      throw new BadRequestException('Id is required!');
    }
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...data };
      }
      return task;
    });

    return this.getTaskById(id);
  }

  deleteTaskById(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks;
  }

  changeStatusTask(id: number) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    return this.getTaskById(id);
  }
}
