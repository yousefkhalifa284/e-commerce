import { Component, inject, signal, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../services/auth/auth.services';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthServices);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  type = signal(true);
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.isLoading.set(false);

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', res.token);
          }

          console.log("Login Success");
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
      this.loginForm.markAllAsTouched();
    }
  }
}
