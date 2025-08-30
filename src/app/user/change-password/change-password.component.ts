import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router, RouterLink} from '@angular/router';
import {UserPasswordUpdateDTO} from '../../model/user/user-password-update-dto.model';
import {ToastService} from '../../shared/toast/toast.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.form = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmNewPassword: ['', [Validators.required, Validators.minLength(8)]]
      },
      {validators: this.passwordMatchValidator}
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      if (this.form.errors?.['mismatch']) {
        this.toastService.show('Passwords do not match', 'danger');
      } else {
        this.toastService.show('Please fix the validation errors.', 'warning');
      }
      return;
    }

    const {oldPassword, newPassword} = this.form.value;

    const passwordUpdateDTO: UserPasswordUpdateDTO = {
      oldPassword,
      newPassword,
    }

    this.userService.updatePassword(passwordUpdateDTO).subscribe({
      next: (response: any) => {
        this.toastService.show(response?.message || 'Password changed successfully', 'success');
        void this.router.navigate(['/me']);
      },
      error: (err) => {
        this.toastService.show(err.error?.error ?? 'Something went wrong', 'danger');
      }
    });
  }

  passwordMatchValidator(group: FormGroup) {
    return group.get('newPassword')?.value === group.get('confirmNewPassword')?.value
      ? null
      : {mismatch: true};
  }
}
