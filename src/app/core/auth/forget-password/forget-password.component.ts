import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../services/auth/auth.services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,TranslateModule],
  templateUrl: './forget-password.component.html'
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthServices);
  private readonly router = inject(Router);

  step = signal(1);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  verifyForm: FormGroup = this.fb.group({
    resetCode: ['', [Validators.required]]
  });

  resetForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  submitEmail() {
    this.isLoading.set(true);
    this.authService.forgotPassword(this.forgotForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.step.set(2);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error.message);
      }
    });
  }

  submitCode() {
    this.isLoading.set(true);
    this.authService.verifyCode(this.verifyForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.resetForm.get('email')?.setValue(this.forgotForm.get('email')?.value);
        this.step.set(3);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error.message);
      }
    });
  }

  submitNewPassword() {
    this.isLoading.set(true);
    this.authService.resetPassword(this.resetForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error.message);
      }
    });
  }
}
