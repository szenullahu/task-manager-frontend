import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDTO} from '../../model/user/user-dto.model';
import {UserService} from '../user.service';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {ToastService} from '../../shared/toast/toast.service';
import {ConfirmService} from '../../shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss'
})
export class MeComponent implements OnInit {
  user: UserDTO | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastService: ToastService,
    private confirmService: ConfirmService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        this.toastService.show(err.error?.error ?? 'Something went wrong', 'danger');
      }
    });
  }

  async deleteUser() {
    const confirmed = await this.confirmService.confirm({
      title: 'Delete Account?',
      message: 'Are you sure you want to delete your Account?',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      this.userService.deleteUser().subscribe({
        next: () => {
          this.authService.logout();
          this.router.navigate(['/login']);
          this.toastService.show('User deleted', 'success');
        },
        error: err => {
          this.toastService.show(err.error?.error ?? 'Something went wrong', 'danger');
        }
      });
    }

  }
}
