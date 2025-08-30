import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {ToastService} from '../../shared/toast/toast.service';
import {Router, RouterLink} from '@angular/router';
import {UserUpdateDTO} from '../../model/user/user-update-dto.model';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit {
  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]]
    });
  }


  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.form.patchValue({
          email: user.email,
          firstname: user.firstname,
          surname: user.surname
        });
      }, error: (err) => {
        this.toastService.show(err.error?.error ?? 'Could not load User', 'danger');
      }
    })
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastService.show('Please fix the validation errors.', 'warning');
      return
    }

    const {email, firstname, surname} = this.form.value;

    const userUpdateDTO: UserUpdateDTO = {
      email,
      firstname,
      surname
    }

    this.userService.updateUser(userUpdateDTO).subscribe({
      next: (response: any) => {
        this.toastService.show(response?.message || 'Profile updated successfully', 'success');
        this.router.navigate(['/me']);
      }, error: (err) => {
        this.toastService.show(err.error?.error ?? 'Something went wrong', 'danger');
      }
    })

  }
}
