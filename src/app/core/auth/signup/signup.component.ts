import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../services/auth/auth.services';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,TranslateModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  signupForm!: FormGroup;

  private readonly authService = inject(AuthServices);
  private readonly router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);


  type: WritableSignal<boolean> = signal(true);
  type2: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        ]],
        rePassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
      },
      { validators: [SignupComponent.matchPasswords] }
    );
  }

  static matchPasswords(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const repass = group.get('rePassword')?.value;

    if (pass !== repass) {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    return null;
  }

  signup() {
    if (this.signupForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      this.authService.signup(this.signupForm.value).subscribe({
        next: (res: any) => {
          this.isLoading.set(false);
          localStorage.setItem('token', res.token);
          console.log("Success:", res);
          this.router.navigate(['/home']);
        },
    error: (err: any) => {
  this.isLoading.set(false);

  let backendError =
    err.error?.errors?.msg ||
    err.error?.message ||
    err.message ||
    "unexpected error occurred";

  this.errorMessage.set(backendError);

  console.error("Error:", err);
}
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
