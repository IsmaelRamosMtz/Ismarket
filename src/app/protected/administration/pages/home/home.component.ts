import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 25px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  get userInfo() {
    return this._authService.userInfo;
  }

  constructor(private router: Router, private _authService: AuthService) { }

  ngOnInit(): void { }

  logout() {
    this._authService.logout();
  }
}
