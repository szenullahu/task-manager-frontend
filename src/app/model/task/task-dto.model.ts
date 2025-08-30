import {TaskStatus} from './task-status.enum';
import {TaskPriority} from './task-priority.enum';

export interface TaskDto {
  id: string;           // UUID
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;      // 'dd-MM-yy'
  created: string;      // 'dd-MM-yy HH:mm:ss'
  updated: string;      // 'dd-MM-yy HH:mm:ss'
}
