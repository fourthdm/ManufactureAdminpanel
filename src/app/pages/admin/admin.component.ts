import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  pro: any;

  isAdmin: boolean = false;

  admins: any[] = [];
  addadmin: FormGroup;
  selectedadmin: any = null;
  editadmin: FormGroup;

  constructor(private _rest: RestService, private _state: StateService) {
    this.addadmin = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      PhoneNo: new FormControl('', [Validators.required]),
      Role: new FormControl('', [Validators.required]),
      Admin_Status: new FormControl(false)
    });
    this.editadmin = new FormGroup({
      Admin_id: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      PhoneNo: new FormControl('', [Validators.required]),
      Role: new FormControl('', [Validators.required]),
      Admin_Status: new FormControl(false)
    })
  }
  ngOnInit(): void {
    this.allAdmin();
    this.getadmintoken();
  }

  toggleStatus(event: any): void {
    this.addadmin.patchValue({
      Admin_Status: event.target.checked ? 1 : 0
    });
  }

  updateStatus(event: any): void {
    this.editadmin.patchValue({
      Admin_Status: event.target.checked ? 1 : 0
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

  admin() {
    this._rest.Addadmin(this.addadmin.value).subscribe((data: any) => {
      console.log(data);
      this.admins = data.data;
      this.addadmin.reset();
    }, (err) => {
      console.log(err);
    })
  }

  allAdmin() {
    this._rest.AllAdmin().subscribe((data: any) => {
      console.log(data);
      this.admins = data.data;
    }, (err: any) => {
      console.log(err);
    })
  }

  editAdmin(Admin_id: number) {
    const selectadmin = this.admins.find(Admin => Admin.Admin_id === Admin_id)
    if (selectadmin) {
      this.selectedadmin = 1;
      this.editadmin.patchValue(selectadmin);
    } else {
      console.log(`Admin with ID ${Admin_id} not found.`);
    }
  }

  Updateadmin() {
    this._rest.UpdateAdmin(this.editadmin.value).subscribe((data: any) => {
      console.log(data);
      this.selectedadmin = null;
      // this._toastr.success('New Admin Added', 'success');
      this.editadmin.reset();
      this.admins = data.data;
    }, (err) => {
      // this._toastr.error('Only Admin Can', 'error');
      console.log(err);
    })
  }

  delete(Admin_id: number) {
    if (confirm('Are You Sure To Delete AdminUser?')) {
      this._rest.DeleteAdmin(Admin_id).subscribe(data => {
        console.log(data);
        this.allAdmin();
      }, err => {
        console.log(err);
        this.allAdmin();
      });
    }
  }
}
