import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TaskDto} from '../model/task/task-dto.model';
import {HttpClient} from '@angular/common/http';
import {TaskCreateDTO} from '../model/task/task-create-dto.model';
import {TaskUpdateDTO} from '../model/task/task-update-dto.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {
  }

  getMyTasks(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.apiUrl);

  }

  getTask(taskId: string): Observable<TaskDto> {
    return this.http.get<TaskDto>(`${this.apiUrl}/${taskId}`);
  }

  createTask(dto: TaskCreateDTO): Observable<TaskDto> {
    return this.http.post<TaskDto>(this.apiUrl, dto);
  }

  updateTask(taskId: string, dto: TaskUpdateDTO) {
    return this.http.put<TaskDto>(`${this.apiUrl}/${taskId}`, dto);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }

}
