import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vendorjobworkchallan',
  templateUrl: './vendorjobworkchallan.component.html',
  styleUrls: ['./vendorjobworkchallan.component.css']
})
export class VendorjobworkchallanComponent implements OnInit {
  pro: any;
  Allvendors: any[] = [];
  AllChallans: any[] = [];
  AllPurchaseOrder: any[] = [];

  challanForm!: FormGroup;
  challanNo = '';
  showPrint = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _rest: RestService
  ) { }

  ngOnInit(): void {
    this.challanForm = this.fb.group({
      job_id: ['', Validators.required],
      vendor_id: ['', Validators.required],
      purchase_order_no: ['', Validators.required],
      purchase_date: ['', Validators.required],
      nature_of_processing: ['', Validators.required],
      remark: [''],
      transport_mode: [''],
      transport_name: [''],
      vehicle_no: [''],
      cgst: [9],
      sgst: [9],
      items: this.fb.array([])
    });

    this.addItem();
    this.Vendors();
    this.VendorsChallans();
    this.PurchaseOrder();
  }

  get items(): FormArray {
    return this.challanForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({
      job_name: ['', Validators.required],
      processing_name: [''],
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
    if (this.challanForm.invalid) {
      console.log('❌ FORM INVALID');
      console.log(this.challanForm.value);
      this.challanForm.markAllAsTouched();
      return;
    }

    console.log('✅ Payload:', this.challanForm.value);

    this.http.post<any>(
      'https://ysurveillance.com/Manufacture/vendor-challan/create',
      this.challanForm.value
    ).subscribe({
      next: res => {
        this.challanNo = res.challan_no;
        this.showPrint = true;
        alert('Vendor Challan Created: ' + this.challanNo);
      },
      error: err => {
        console.error(err);
        alert('API Error');
      }
    });
  }

  Vendors() {
    this._rest.AllVendorsData().subscribe((res: any) => {
      this.Allvendors = res.data;
    });
  }

  VendorsChallans() {
    this._rest.AllVendorChallan().subscribe((data: any) => {
      this.AllChallans = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }


  downloadPdf(challan_id: any) {
    this._rest.GenerateChallan(challan_id)
      .subscribe((file: Blob) => {
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Donation_Receipt_${challan_id}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      });
  }

  printPdf(challan_id: any) {
    this._rest.GenerateChallan(challan_id)
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

  PurchaseOrder() {
    this._rest.AllPurchaseOrder().subscribe((data: any) => {
      this.AllPurchaseOrder = data.data;
      console.log(data);
    }, (err: any) => {
      console.log(err);
    });
  }

  //   Allvendors: any[] = [];

  //   challanForm: FormGroup;
  //   challanNo: string = '';
  //   showPrint = false;

  //   constructor(private _rest: RestService, private fb: FormBuilder, private http: HttpClient) {
  //     this.challanForm = this.fb.group({
  //       job_id: new FormControl('', [Validators.required]),
  //       vendor_id: new FormControl('', [Validators.required]),
  //       purchase_order_no: new FormControl('', [Validators.required]),
  //       purchase_date: new FormControl('', [Validators.required]),
  //       nature_of_processing: new FormControl('', [Validators.required]),
  //       remark: new FormControl(''),
  //       transport_mode: new FormControl(''),
  //       transport_name: new FormControl(''),
  //       vehicle_no: new FormControl(''),
  //       cgst: [9],
  //       sgst: [9],
  //       items: this.fb.array([])

  //       // vendor_id: ['', Validators.required],
  //       // purchase_order_no: [''],
  //       // purchase_date: [''],
  //       // nature_of_processing: [''],
  //       // remark: [''],
  //       // transport_mode: [''],
  //       // transport_name: [''],
  //       // vehicle_no: [''],
  //       // cgst: [9],
  //       // sgst: [9],
  //       // items: this.fb.array([])
  //     });
  //   }

  //   ngOnInit() {
  //     this.Vendors();

  //     this.addItem();
  //   }

  //   get items(): FormArray {
  //     return this.challanForm.get('items') as FormArray;
  //   }

  //   addItem() {
  //     this.items.push(this.fb.group({
  //       job_name: ['', Validators.required],
  //       processing_name: [''],
  //       hsn_code: [''],
  //       quantity: [1, Validators.required],
  //       unit: ['Pcs'],
  //       rate: [0, Validators.required]
  //     }));
  //   }

  //   removeItem(index: number) {
  //     this.items.removeAt(index);
  //   }

  //   submitChallan() {
  //     if (this.challanForm.invalid) {
  //       console.log('Form Invalid', this.challanForm.value);
  //       return;
  //     }

  //     console.log('Payload sending:', this.challanForm.value);

  //     this.http.post<any>(
  //       'http://localhost:3000/vendor-challan/create',
  //       this.challanForm.value
  //     ).subscribe({
  //       next: (res) => {
  //         console.log('API Response:', res);
  //         this.challanNo = res.challan_no;
  //         this.showPrint = true;
  //         alert('Vendor Challan Created: ' + this.challanNo);
  //       },
  //       error: (err) => {
  //         console.error('API Error:', err);
  //         alert('API failed');
  //       }
  //     });
  //   }

  //   printChallan() {
  //     const printContent = document.getElementById('print-section')?.innerHTML;
  //     const originalContent = document.body.innerHTML;

  //     document.body.innerHTML = printContent!;
  //     window.print();
  //     document.body.innerHTML = originalContent;
  //     window.location.reload();
  //   }

  //   Vendors() {
  //     this._rest.AllVendorsData().subscribe((data: any) => {
  //       console.log(data);
  //       this.Allvendors = data.data;
  //     }, (err: any) => {
  //       console.log(err);
  //     });
  //   }


}
