import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  pro: any;
  isAdmin: boolean = false;

  AllCompanies: any[] = [];
  AddCompaniesform: FormGroup;
  EditformCompanies: FormGroup;

  SelectedCompanies: any = undefined;



  constructor(private _rest: RestService, private _route: Router) {
    this.AddCompaniesform = new FormGroup({
      company_name: new FormControl('', [Validators.required]),
      company_address: new FormControl('', [Validators.required]),
      company_material_type: new FormControl('', [Validators.required]),
      company_phone: new FormControl('', [Validators.required]),
      company_email: new FormControl('', [Validators.required]),
      gst_no: new FormControl('', [Validators.required])
    });

    this.EditformCompanies = new FormGroup({
      company_id: new FormControl(''),
      company_name: new FormControl('', [Validators.required]),
      company_address: new FormControl('', [Validators.required]),
      company_material_type: new FormControl('', [Validators.required]),
      company_phone: new FormControl('', [Validators.required]),
      company_email: new FormControl('', [Validators.required]),
      gst_no: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.Companies();
    this.getadmintoken();
  }

  Companies() {
    this._rest.AllCompanies().subscribe((data: any) => {
      console.log(data);
      this.AllCompanies = data.data;
    }, (err: any) => {
      console.log(err);
    });
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

  AddCompanies() {
    this._rest.AddCompanies(this.AddCompaniesform.value).subscribe((data: any) => {
      console.log(data);
      this.AddCompaniesform.reset();
      this.AllCompanies = data.data;
      this.ngOnInit();
    }, (err: any) => {
      console.log(err);
    });
  }

  editCompanies(company_id: number) {
    const selectadmin = this.AllCompanies.find(Admin => Admin.company_id === company_id)
    if (selectadmin) {
      this.SelectedCompanies = 1;
      this.EditformCompanies.patchValue(selectadmin);
    } else {
      console.log(`Admin with ID ${company_id} not found.`);
    }
  }

  UpdateCompanies() {
    this._rest.UpdateComapnies(this.EditformCompanies.value).subscribe((data: any) => {
      console.log(data);
      this.SelectedCompanies = null;
      // this._toastr.success('New Admin Added', 'success');
      this.EditformCompanies.reset();
      this.AllCompanies = data.data;
      this.ngOnInit();
    }, (err) => {
      // this._toastr.error('Only Admin Can', 'error');
      console.log(err);
    })
  }

  DeleteCompanies(company_id: number) {
    if (confirm('Are You Sure To Delete AdminUser?')) {
      this._rest.DeleteCompanies(company_id).subscribe(data => {
        console.log(data);
        this.Companies();
      }, err => {
        console.log(err);
        this.Companies();
      });
    }
  }

}
