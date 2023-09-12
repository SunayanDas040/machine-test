import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public message: string = '';

  constructor(
    private _backend: BackendService,
    private _fb: FormBuilder,
    private router: Router
  ) {}

  public loginForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit(): void {}

  onSubmit() {
    const payload = this.loginForm.getRawValue();
    this._backend.loginUser(payload).subscribe({
      next: (data: any) => {
        if (data.status) {
          localStorage.setItem('accessToken', data.token);
        }
        this.router.navigate(['user-details']);
      },
      error: (error: any) => {
        console.log(error);
        this.loginForm.reset();
        this.message = error.error.message;
        this.router.navigate(['/login']);
      },
    });
  }

  checkEnable() {
    return this.loginForm.invalid;
  }
}
