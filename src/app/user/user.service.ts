import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDTO} from '../model/user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/me`);
  }
}
