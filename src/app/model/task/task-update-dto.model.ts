import {TaskPriority} from './task-priority.enum';
import {TaskStatus} from './task-status.enum';

export interface TaskUpdateDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
}
