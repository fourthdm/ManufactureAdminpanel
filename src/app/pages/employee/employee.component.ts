import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  pro: any;

  isAdmin: boolean = false;   // To logged-in user is an admin Or not

  AllEmployee: any[] = [];
  AddEmployeeForm: FormGroup;
  EditEmployeeForm: FormGroup;

  SelectedEmployee: any = null;

  constructor(private _rest: RestService, private _state: StateService) {
    this.AddEmployeeForm = new FormGroup({
      E_Code: new FormControl('', [Validators.required]),
      E_Name: new FormControl('', [Validators.required]),
      E_Email: new FormControl('', [Validators.required]),
      E_PhoneNo: new FormControl('', [Validators.required]),
      E_Address: new FormControl('', [Validators.required]),
      E_Username: new FormControl('', [Validators.required]),
      E_Password: new FormControl('', [Validators.required]),
      E_Role: new FormControl('', [Validators.required]),
      E_Status: new FormControl(false)
    });

    this.EditEmployeeForm = new FormGroup({
      E_id: new FormControl(''),
      E_Code: new FormControl('', [Validators.required]),
      E_Name: new FormControl('', [Validators.required]),
      E_Email: new FormControl('', [Validators.required]),
      E_PhoneNo: new FormControl('', [Validators.required]),
      E_Address: new FormControl('', [Validators.required]),
      E_Username: new FormControl('', [Validators.required]),
      E_Password: new FormControl('', [Validators.required]),
      E_Role: new FormControl('', [Validators.required]),
      E_Status: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.AllEmployees();
    this.getadmintoken();
  }

  AllEmployees() {
    this._rest.Allemployeedata().subscribe((data: any) => {
      console.log("All Employees", data);
      this.AllEmployee = data.data;
    }, (err: any) => {
      console.error("Error fetching employees", err);
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

  ToggleStatus(event: any): void {
    this.AddEmployeeForm.patchValue({
      E_Status: event.target.checked ? 1 : 0
    });
  }

  updateStatus(event: any): void {
    this.EditEmployeeForm.patchValue({
      E_Status: event.target.checked ? 1 : 0
    });
  }

  AddEmployee() {
    this._rest.AddEmployee(this.AddEmployeeForm.value).subscribe((data: any) => {
      console.log("Employee Added", data);
      this.AllEmployee = data.data;
      this.AddEmployeeForm.reset();
      this.ngOnInit();
    }, (err: any) => {
      console.error("Error adding employee", err);
    });
  }

  editEmployee(E_id: any) {
    const employee = this.AllEmployee.find(e => e.E_id === E_id);
    if (employee) {
      this.SelectedEmployee = 1;
      this.EditEmployeeForm.patchValue(employee);
    } else {
      console.error("Employee not found");
    }
  }

  UpdateEmployee() {
    this._rest.UpdateEmployee(this.EditEmployeeForm.value).subscribe((data: any) => {
      console.log("Employee Updated", data);
      this.EditEmployeeForm.reset();
      this.ngOnInit();
    }, (err: any) => {
      console.error("Error updating employee", err);
    })
  }


  delete(E_id: any) {
    this._rest.DeleteEmployee(E_id).subscribe((data: any) => {
      console.log("Employee Deleted", data);
      this.AllEmployee = data.data;
    }, (err: any) => {
      console.error("Error deleting employee", err);
    });
  }

}
