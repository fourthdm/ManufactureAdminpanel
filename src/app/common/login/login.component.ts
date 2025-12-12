import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
liked: boolean = false;

  loginform: FormGroup;

  constructor(private _rest: RestService, private _router: Router, private _state: StateService) {
    this.loginform = new FormGroup({
      Username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Password: new FormControl('', [Validators.required, Validators.maxLength(8)])
    })
  }

  ngOnInit(): void {

  }

  Show() {
    this.liked = !this.liked;
  }

  login() {
    this._rest.Login(this.loginform.value).subscribe((data: any) => {
      console.log(data);
      // this.toastr.success(data.message, 'success');
      localStorage.setItem('token', data.data);
      this._state.token = (data.data);
      this._state.decodedToken();
      this._router.navigate(['/Home']);
    }, (err: any) => {
      console.log(err);
      // this.toastr.error(err.message, 'Error');
    })
  }
}
