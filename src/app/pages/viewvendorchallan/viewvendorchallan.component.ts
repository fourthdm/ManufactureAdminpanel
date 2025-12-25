import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewvendorchallan',
  templateUrl: './viewvendorchallan.component.html',
  styleUrls: ['./viewvendorchallan.component.css']
})
export class ViewvendorchallanComponent implements OnInit{

  pro: any;
  Vendorchallan: any[] = [];
  Alljob: any[] = [];

  constructor(private _rest: RestService, private _activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.AllJobs();

    this._activateRoute.params.subscribe((params: Params) => {
      const challan_id = params['challan_id'];
      this._rest.Challanbyid(challan_id).subscribe((data: any) => {
        this.Vendorchallan = data.data;
        // if (this.Vendorchallan.length > 0) {
        //   const designFileUrl = this.Vendorchallan[0].DesignFile;
        // }
      }, (err: any) => {
        console.log(err);
      });
    });
  }

  AllJobs() {
    this._rest.Jobtabledata().subscribe((data: any) => {
      console.log(data),
        this.Alljob = data.data
    }, (err: any) => {
      console.log(err);
    }
    )
  }


}
