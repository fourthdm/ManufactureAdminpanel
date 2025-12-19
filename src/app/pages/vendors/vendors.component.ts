import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  pro: any  // pro is used for pagination  
  Allvendors: any[] = [];  //it used to store all data from table.
  AddVendorsform: FormGroup;   //Form for Add a new vendor
  EditVendorsForm: FormGroup;   //Form for Update a new vendor

  isAdmin: boolean = false;
  SelectedVendor: any = null;

  constructor(private _rest: RestService, private _router: Router, private fb: FormBuilder) {
    this.AddVendorsform = new FormGroup({
      vendor_name: new FormControl('', [Validators.required]),
      company_name: new FormControl('', [Validators.required]),
      gst_no: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });

    this.EditVendorsForm = new FormGroup({
      vendor_id: new FormControl(''),
      vendor_name: new FormControl('', [Validators.required]),
      company_name: new FormControl('', [Validators.required]),
      gst_no: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.Vendors();
    this.getadmintoken();
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


  Vendors() {
    this._rest.AllVendorsData().subscribe((data: any) => {
      console.log(data);
      this.Allvendors = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  AddVendors() {
    this._rest.AddVendors(this.AddVendorsform.value).subscribe((data: any) => {
      this.AddVendorsform.reset();
      this.Allvendors = data.data;
      this.ngOnInit();
    }, (err: any) => {
      console.log(err);
    });
  }

  EditVendors(vendor_id: any) {
    const selectvendor = this.Allvendors.find(Vendor => Vendor.vendor_id === vendor_id);
    if (selectvendor) {
      this.SelectedVendor = 1;
      this.EditVendorsForm.patchValue(selectvendor);
    } else {
      console.log(`Vendor with ID ${vendor_id} not found.`);
    }
  }

  UpdateVendors() {
    const payload = {
      vendor_id: this.EditVendorsForm.value.vendor_id,
      vendor_name: this.EditVendorsForm.value.vendor_name,
      company_name: this.EditVendorsForm.value.company_name,
      gst_no: this.EditVendorsForm.value.gst_no,
      phone: this.EditVendorsForm.value.phone,
      email: this.EditVendorsForm.value.email,
      address: this.EditVendorsForm.value.address
    };

    this._rest.UpdateVendor(payload).subscribe(
      (data: any) => {
        console.log(data);
        this.SelectedVendor = null;
        this.EditVendorsForm.reset();
        this.Vendors(); // 👈 reload list
      },
      err => console.log(err)
    );
    // this._rest.UpdateVendor(this.EditVendorsForm.value).subscribe((data: any) => {
    //   console.log(data);
    //   this.SelectedVendor = null;
    //   this.EditVendorsForm.reset();
    //   this.Allvendors = data.data;
    // }, (err: any) => {
    //   console.log(err);
    // });
  }

  DeleteVendors(vendor_id: any) {
    if (confirm('Are You sure to Delete Vendor Data')) {
      this._rest.DeleteVendors(vendor_id).subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
      }, (err: any) => {
        console.log(err);
      });
    }

  }

}
