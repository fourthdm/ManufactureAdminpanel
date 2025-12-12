import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  token = '';
  report: any = undefined;

  constructor(private _router: Router) { }

  decodedToken() {
    this.report = jwtDecode(this.token);
    return this.report;
  }

  CheckToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.decodedToken();
    } else {
      this._router.navigate(['/login']);
    }
  }
}
