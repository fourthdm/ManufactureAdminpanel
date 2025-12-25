import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  pro: any  // pro is used for pagination  
  allcustomers: any[] = [];  //it used to store all data from table.
  AddCustomerform: FormGroup;   //Form for Add a new vendor
  EditCustomersForm: FormGroup;   //Form for Update a new vendor

  isAdmin: boolean = false;
  SelectedVendor: any = null;

  constructor(private _rest: RestService, private _router: Router, private fb: FormBuilder) {
    this.AddCustomerform = new FormGroup({
      customer_name: new FormControl('', [Validators.required]),
      company_name: new FormControl('', [Validators.required]),
      customer_phoneno: new FormControl('', [Validators.required]),
      customer_email: new FormControl('', [Validators.required]),
      customer_address: new FormControl('', [Validators.required]),
      gst_no: new FormControl('', [Validators.required]),
    });

    this.EditCustomersForm = new FormGroup({
      customer_id: new FormControl(''),
      customer_name: new FormControl('', [Validators.required]),
      company_name: new FormControl('', [Validators.required]),
      customer_phoneno: new FormControl('', [Validators.required]),
      customer_email: new FormControl('', [Validators.required]),
      customer_address: new FormControl('', [Validators.required]),
      gst_no: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.Customers();
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


  Customers() {
    this._rest.AllCutomers().subscribe((data: any) => {
      console.log(data);
      this.allcustomers = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  Addcustomers() {
    this._rest.AddCustomers(this.AddCustomerform.value).subscribe((data: any) => {
      this.AddCustomerform.reset();
      this.allcustomers = data.data;
      this.ngOnInit();
    }, (err: any) => {
      console.log(err);
    });
  }

  EditVendors(customer_id: any) {
    const selectvendor = this.allcustomers.find(customer => customer.customer_id === customer_id);
    if (selectvendor) {
      this.SelectedVendor = 1;
      this.EditCustomersForm.patchValue(selectvendor);
    } else {
      console.log(`Vendor with ID ${customer_id} not found.`);
    }
  }

  UpdateVendors() {
    const payload = {
      customer_id: this.EditCustomersForm.value.customer_id,
      customer_name: this.EditCustomersForm.value.customer_name,
      company_name: this.EditCustomersForm.value.company_name,
      customer_phoneno: this.EditCustomersForm.value.customer_phoneno,
      gst_no: this.EditCustomersForm.value.gst_no,
      customer_email: this.EditCustomersForm.value.customer_email,
      customer_address: this.EditCustomersForm.value.customer_address,
    };

    this._rest.Updatecustomer(payload).subscribe(
      (data: any) => {
        console.log(data);
        this.SelectedVendor = null;
        this.EditCustomersForm.reset();
        this.Customers(); // 👈 reload list
      },
      err => console.log(err)
    );
    // this._rest.UpdateVendor(this.EditCustomersForm.value).subscribe((data: any) => {
    //   console.log(data);
    //   this.SelectedVendor = null;
    //   this.EditCustomersForm.reset();
    //   this.Allvendors = data.data;
    // }, (err: any) => {
    //   console.log(err);
    // });
  }

  DeleteVendors(customer_id: any) {
    if (confirm('Are You sure to Delete Customer Data')) {
      this._rest.DelteCustomer(customer_id).subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
      }, (err: any) => {
        console.log(err);
      });
    }

  }

}
