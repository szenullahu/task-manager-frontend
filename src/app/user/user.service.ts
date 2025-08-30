import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDTO} from '../model/user/user-dto.model';
import {UserUpdateDTO} from '../model/user/user-update-dto.model';
import {UserPasswordUpdateDTO} from '../model/user/user-password-update-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/me`);
  }

  deleteUser() {
    return this.http.delete(`${this.apiUrl}/me`);
  }

  updatePassword(dto: UserPasswordUpdateDTO) {
    return this.http.put<{ message: string }>(`${this.apiUrl}/me/password`, dto);
  }

  updateUser(dto: UserUpdateDTO) {
    return this.http.put<{ message: string }>(`${this.apiUrl}/me`, dto);
  }
}
