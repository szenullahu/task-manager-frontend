import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TaskService} from '../task.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TaskPriority} from '../../model/task/task-priority.enum';
import {TaskStatus} from '../../model/task/task-status.enum';
import {TaskUpdateDTO} from '../../model/task/task-update-dto.model';
import {TaskCreateDTO} from '../../model/task/task-create-dto.model';
import {NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DateFormatter} from '../../shared/formatters/date-formatter';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule, NgbDatepickerModule],
  providers: [
    {provide: NgbDateParserFormatter, useClass: DateFormatter}
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  form: FormGroup;
  taskId: string | null = null;
  minDate: NgbDateStruct;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder
  ) {
    const today = new Date();
    this.minDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(120)]],
      description: [''],
      status: [TaskStatus.PENDING, Validators.required],
      priority: [TaskPriority.MEDIUM, Validators.required],
      dueDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.taskService.getTask(this.taskId).subscribe({
        next: (task) => {
          // task.dueDate format from backend: "dd-MM-yy" (e.g., "31-08-25")
          const [dayStr, monthStr, yyStr] = task.dueDate.split('-');
          const day = Number(dayStr);
          const month = Number(monthStr);
          const yy = Number(yyStr);
          const year = yy < 100 ? 2000 + yy : yy; // expand 2-digit year for NgbDateStruct

          const ngbDate: NgbDateStruct = {year, month, day};

          this.form.patchValue({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: ngbDate
          });
        },
        error: (err) => console.error('Task not found', err)
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const rawForm = this.form.value;
    const d: NgbDateStruct = rawForm.dueDate;

    const formattedDate = `${String(d.day).padStart(2, '0')}-${String(d.month).padStart(2, '0')}-${String(d.year).toString().slice(-2)}`;

    if (this.taskId) {
      const taskUpdateDTO: TaskUpdateDTO = {
        ...rawForm,
        dueDate: formattedDate
      };
      this.taskService.updateTask(this.taskId, taskUpdateDTO).subscribe({
        next: () => this.router.navigate(['/tasks'])
      });
    } else {
      const taskCreateDTO: TaskCreateDTO = {
        ...rawForm,
        dueDate: formattedDate
      };
      this.taskService.createTask(taskCreateDTO).subscribe({
        next: () => this.router.navigate(['/tasks'])
      });
    }
  }

  capitalizeFirst(controlName: string) {
    const ctrl = this.form.get(controlName);
    if (ctrl) {
      const value = ctrl.value;
      if (typeof value === 'string' && value.length > 0) {
        const newValue = value.charAt(0).toUpperCase() + value.slice(1);
        if (newValue !== value) {
          ctrl.setValue(newValue, {emitEvent: false});
        }
      }
    }
  }


}
