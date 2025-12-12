import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @Input() E_Code: any;

  constructor(private _rest: RestService, private _router: Router) { }

  ngOnInit(): void {

  }

  login() {
    if (!this.E_Code) {
      alert("Please enter employee code");
      return;
    }

    this._rest.EmployeeLogin({
      E_Code: this.E_Code
    })
      .subscribe((res: any) => {
        localStorage.setItem("token", res.token);
        this._router.navigate(['/Home/DesingerJob']);
      }, err => {
        alert("Invalid employee code");
      });
  }
}
