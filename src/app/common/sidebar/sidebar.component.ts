import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isAdmin: boolean = false;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.getadmintoken();
  }

  Logout() {
    localStorage.removeItem('token');
    this._router.navigate(['login']);
  }

  getadmintoken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.Role === 'Admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
  }

}
