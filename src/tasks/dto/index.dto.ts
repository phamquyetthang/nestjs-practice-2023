export class Tasks {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export class CreateTask {
  title: string;
  description: string;
  status: boolean;
}

export class GetTaskDto {
  page: string;
  pageSize: string;
}
