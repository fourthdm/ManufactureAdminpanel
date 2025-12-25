import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-purchaseorder',
  templateUrl: './purchaseorder.component.html',
  styleUrls: ['./purchaseorder.component.css']
})
export class PurchaseorderComponent implements OnInit {
  pro: any;
  AllPurchaseOrder: any[] = [];

  AddformPurchaseorder: FormGroup;
  EditformPurchaseorder: FormGroup;

  SelectedPurchaseOrder: any = null;
  isAdmin: boolean = false;

  constructor(private _rest: RestService, private _route: Router) {
    this.AddformPurchaseorder = new FormGroup({
      total_amount: new FormControl('', [Validators.required]),
      purchasestatus: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      purchaseaddress: new FormControl('', [Validators.required])
    });

    this.EditformPurchaseorder = new FormGroup({
      purchase_order_id: new FormControl(''),
      total_amount: new FormControl('', [Validators.required]),
      purchasestatus: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      purchaseaddress: new FormControl('', [Validators.required])
    });

  }

  ngOnInit(): void {
    this.PurchaseOrder();
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
  PurchaseOrder() {
    this._rest.AllPurchaseOrder().subscribe((data: any) => {
      this.AllPurchaseOrder = data.data;
      console.log(data);
    }, (err: any) => {
      console.log(err);
    });
  }

  AddPurchaseOrder() {
    this._rest.ADDPurchaseorder(this.AddformPurchaseorder.value).subscribe((data: any) => {
      console.log(data);
      this.AllPurchaseOrder = data.data;
      this.AddformPurchaseorder.reset();
    }, (err: any) => {
      console.log(err);
    });
  }

  EditVendors(purchase_order_id: any) {
    const selectvendor = this.AllPurchaseOrder.find(customer => customer.purchase_order_id === purchase_order_id);
    if (selectvendor) {
      this.SelectedPurchaseOrder = 1;
      this.EditformPurchaseorder.patchValue(selectvendor);
    } else {
      console.log(`Vendor with ID ${purchase_order_id} not found.`);
    }
  }

  UpdateVendors() {
    const payload = {
      purchase_order_id: this.EditformPurchaseorder.value.purchase_order_id,
      total_amount: this.EditformPurchaseorder.value.total_amount,
      purchasestatus: this.EditformPurchaseorder.value.purchasestatus,

    };

    this._rest.EditPurchaseOrder(payload).subscribe(
      (data: any) => {
        console.log(data);
        this.SelectedPurchaseOrder = null;
        this.EditformPurchaseorder.reset();
        this.PurchaseOrder(); // 👈 reload list
      },
      err => console.log(err)
    );
  }

  DeleteVendors(purchase_order_id: any) {
    if (confirm('Are You sure to Delete Customer Data')) {
      this._rest.DeletePurchaseOrder(purchase_order_id).subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
      }, (err: any) => {
        console.log(err);
      });
    }
  }

}
