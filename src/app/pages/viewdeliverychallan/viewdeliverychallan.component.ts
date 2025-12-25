import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewdeliverychallan',
  templateUrl: './viewdeliverychallan.component.html',
  styleUrls: ['./viewdeliverychallan.component.css']
})
export class ViewdeliverychallanComponent implements OnInit {
  pro: any;
  Deliverychallan: any[] = [];
  Alljob: any[] = [];

  constructor(private _rest: RestService, private _activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.AllJobs();

    this._activateRoute.params.subscribe((params: Params) => {
      const delivery_challan_id = params['delivery_challan_id'];
      this._rest.Deliverychallanbyid(delivery_challan_id).subscribe((data: any) => {
        this.Deliverychallan = data.data;
        // if (this.Deliverychallan.length > 0) {
        //   const designFileUrl = this.Deliverychallan[0].DesignFile;
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
