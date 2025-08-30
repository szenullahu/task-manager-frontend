import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router, RouterLink} from '@angular/router';
import {ToastService} from '../../shared/toast/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstname: ['', [Validators.required]],
      surname: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastService.show('Please fix the validation errors.', 'warning')
      return;
    }

    this.auth.register(this.form.value).subscribe({
      next: (response: any) => {
        this.toastService.show(response?.message || 'Account created successfully', 'success');
        void this.router.navigate(['/login']);
      },
      error: (err) => {
       this.toastService.show(err.error?.error ?? 'Something went wrong', 'danger');
      }
    });
  }

  capitalizeFirst(controlName: string) {
    const ctrl = this.form.get(controlName);
    if (ctrl) {
      const value = ctrl.value;
      if (typeof value === 'string' && value.length > 0) {
        const newValue = value.charAt(0).toUpperCase() + value.slice(1);
        if (newValue !== value) {
          ctrl.setValue(newValue, { emitEvent: false });
        }
      }
    }
  }

}
