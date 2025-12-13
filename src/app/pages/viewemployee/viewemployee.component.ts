import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css']
})
export class ViewemployeeComponent {

  EmployeeData: any[] = [];

  constructor(private _rest: RestService, private _router: Router, private _activateroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activateroute.params.subscribe((params: Params) => {
      const E_id = params['E_id'];
      this._rest.EmployeedatabyId(E_id).subscribe((data: any) => {
        this.EmployeeData = data.data;
      }, (err: any) => {
        console.log(err);
      });
    });
  }

}
