import {Component, OnInit} from '@angular/core';
import {TaskDto} from '../../model/task/task-dto.model';
import {TaskService} from '../task.service';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import {ConfirmService} from '../../shared/confirm-dialog/confirm-dialog.service';
import {ToastService} from '../../shared/toast/toast.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: TaskDto[] = [];
  loading = true;

  constructor(
    private taskService: TaskService,
    private confirmService: ConfirmService,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.taskService.getMyTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log(this.tasks.length)
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading tasks', err);
        this.loading = false;
      }
    });
  }

  async deleteTask(taskId: string) {
    const confirmed = await this.confirmService.confirm({
      title: 'Delete Task?',
      message: 'Are you sure you want to delete this task?',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
          this.toastService.show('Task deleted', 'success');
        },
        error: (err) => {
          this.toastService.show(err.error?.error ?? 'Something went wrong', 'danger');
        }
      });
    }
  }

  isOverdue(date: string | Date): boolean {
    return new Date(date).getTime() < Date.now();
  }

  isDueSoon(date: string | Date, days = 3): boolean {
    const due = new Date(date).getTime();
    const soon = Date.now() + days * 24 * 60 * 60 * 1000;
    return due >= Date.now() && due <= soon;
  }

}
