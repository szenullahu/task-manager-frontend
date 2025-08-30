import {TaskStatus} from './task-status.enum';
import {TaskPriority} from './task-priority.enum';

export interface TaskCreateDTO {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;   // same "dd-MM-yy" format
}
