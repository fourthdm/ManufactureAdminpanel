import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewmachines',
  templateUrl: './viewmachines.component.html',
  styleUrls: ['./viewmachines.component.css']
})
export class ViewmachinesComponent {

  Machines: any[] = [];

  constructor(private _rest: RestService, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedroute.params.subscribe((params: Params) => {
      const Machine_id = params['Machine_id'];
      this._rest.MachineById(Machine_id).subscribe((data: any) => {
        this.Machines = data.data;
      }, (err: any) => {
        console.log(err);
      });
    });
  }
}
