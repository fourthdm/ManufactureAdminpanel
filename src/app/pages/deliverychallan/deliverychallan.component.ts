import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-deliverychallan',
  templateUrl: './deliverychallan.component.html',
  styleUrls: ['./deliverychallan.component.css']
})
export class DeliverychallanComponent implements OnInit {

  pro: any;
  AllCustomers: any[] = [];
  AllDeliveryChallans: any[] = [];
  Alljob: any[] = [];

  DeliverychallanForm!: FormGroup;
  challanNo = '';
  showPrint = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _rest: RestService
  ) { }

  ngOnInit(): void {
     this.VendorsChallans();
    this.DeliverychallanForm = this.fb.group({
      job_id: ['', Validators.required],
      customer_id: ['', Validators.required],
      po_no: ['', Validators.required],
      transport_mode: [''],
      transport_name: [''],
      vehicle_no: [''],
      cgst_amount: [9],
      sgst_amount: [9],
      remark: [''],
      items: this.fb.array([])
    });

    this.addItem();
    this.AllJobs();
    this.Vendors();
   
  }

  get items(): FormArray {
    return this.DeliverychallanForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({
      job_name: ['', Validators.required],
      hsn_code: [''],
      quantity: [1, Validators.required],
      unit: ['Pcs'],
      rate: [0, Validators.required]
    }));
  }

  removeItem(i: number) {
    this.items.removeAt(i);
  }

  submitChallan() {
    if (this.DeliverychallanForm.invalid) {
      console.log('❌ FORM INVALID');
      console.log(this.DeliverychallanForm.value);
      this.DeliverychallanForm.markAllAsTouched();
      return;
    }

    console.log('✅ Payload:', this.DeliverychallanForm.value);

    this.http.post<any>(
      // 'https://ysurveillance.com/Manufacture/delivery-challan/create',
      'http://localhost:3000/delivery-challan/create',
      this.DeliverychallanForm.value
    ).subscribe({
      next: res => {
        this.challanNo = res.challan_no;
        this.showPrint = true;
        alert('Delivery Challan Created: ' + this.challanNo);
      },
      error: err => {
        console.error(err);
        alert('API Error');
      }
    });
  }

  Vendors() {
    this._rest.AllCutomers().subscribe((res: any) => {
      this.AllCustomers = res.data;
    });
  }

  VendorsChallans() {
    this._rest.DeliveryChallanData().subscribe((data: any) => {
      this.AllDeliveryChallans = data.data;
    }, (err: any) => {
      console.log(err);
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

  downloadPdf(delivery_challan_id: any) {
    this._rest.GenerateDeliveryChallan(delivery_challan_id)
      .subscribe((file: Blob) => {
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Delivery Challan${delivery_challan_id}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      });
  }

  printPdf(delivery_challan_id: any) {
    this._rest.GenerateDeliveryChallan(delivery_challan_id)
      .subscribe((file: Blob) => {
        const url = window.URL.createObjectURL(file);
        const win = window.open('', '_blank');

        if (win) {
          win.document.write(
            `<iframe src="${url}" style="width:100%;height:100%;border:none;"></iframe>`
          );

          setTimeout(() => {
            win.print();
          }, 800);

          URL.revokeObjectURL(url);
        }
      });
  }

}
