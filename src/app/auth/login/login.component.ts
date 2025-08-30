import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router, RouterLink} from '@angular/router';
import {ToastService} from '../../shared/toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastService: ToastService,
    private router: Router
  )
  {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastService.show('Please fix the validation errors.', 'warning');
      return;
    }

    this.auth.login(this.form.value).subscribe({
      next: (response) => {
        this.auth.saveToken(response.token);
        this.toastService.show('Signed in successfully', 'success');
        void this.router.navigate(['/tasks']);
      },
      error: () => {
        this.toastService.show('Invalid username or password.', 'danger');
      },
    });
  }
}
