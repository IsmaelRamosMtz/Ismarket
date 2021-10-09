import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginFormulario: FormGroup = this._fb.group({
    email: ['sa@gmail.com', [Validators.required, Validators.email]],
    pass: ['', [Validators.required]],
  });

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    const { email, pass } = this.loginFormulario.value;

    this._authService.userLogin(email, pass).subscribe((ok) => {
      if (ok === true) {
        this._router.navigateByUrl('/administration');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas',
          text: ok,
          // background: '#F0F0F3',
          showClass: {
            popup: 'animate__animated animate__bounceInUp'
          }
        })
      }
    });
  }
}
