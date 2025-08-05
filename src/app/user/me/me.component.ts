import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDTO} from '../../model/user-dto.model';
import {UserService} from '../user.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss'
})
export class MeComponent {
  user: UserDTO | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (data)=> {
        this.user = data;
        console.log(this.user);
      },
      error: (err) => {
        console.error('Failed to load user info', err);
      }
    });
  }

}
