import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {

  Alljob: any[] = [];
  form!: FormGroup;
  machines: any[] = [];
  employees: any[] = [];
  selectedFile: File | null = null;

  Editjobsform: FormGroup;
  jobsform: FormGroup;
  AllEmployee: any[] = [];
  AllQC: any[] = [];
  AlMachines: any[] = [];
  AllMaterial: any[] = [];
  SelectedJob: any;

  constructor(private fb: FormBuilder, private _rest: RestService) {

    this.jobsform = new FormGroup({
      J_Name: new FormControl("", Validators.required),
      E_id: new FormControl("", Validators.required),
      Machine_id: new FormControl("", Validators.required),
      Material_id: new FormControl("", Validators.required),
      Material_Issued: new FormControl("", Validators.required),
      DesignFile: new FormControl(null)
    }),
      this.Editjobsform = new FormGroup({
        Job_id: new FormControl(""),
        J_Name: new FormControl("", Validators.required),
        E_id: new FormControl("", Validators.required),
        Machine_id: new FormControl("", Validators.required),
        Material_id: new FormControl("", Validators.required),
        Material_Issued: new FormControl("", Validators.required),
        DesignFile: new FormControl(null)
      })

  }


  ngOnInit() {
    this.AllJobs(),
      this.Allemp(),
      this.AllQCData(),
      this.AllMachines(),
      this.ALLMaterial(),
      // this.form = this.fb.group({
      //   J_Name: ["", x.required],
      //   E_id: ["", x.required],
      //   Machine_id: ["", x.required],
      //   Material_id: ["", x.required],
      //   Material_Issued: ["", x.required]
      // }),
      this.loadLists()
  }

  loadLists() {
    this._rest.AvailbleMachine().subscribe((data:any) => this.machines = data.data || []),
      this._rest.AllOnlyEmployee().subscribe((data:any) => this.employees = data.data || [])
  }


  // onFileSelect(event) {
  //   this.selectedFile = event.target.files[0]
  // }

  addJob() {
    if (this.form.invalid)
      return alert("Fill required fields");
    const t = new FormData;
    Object.keys(this.form.value).forEach(r => t.append(r, this.form.value[r])),
      this.selectedFile && t.append("DesignFile", this.selectedFile),
      this._rest.JobAdd(t).subscribe({
        next: r => {
          alert("Job created"),
            this.form.reset(),
            this.loadLists()
        }
        ,
        error: r => alert("Error: " + r.error?.message || 0)
      })
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
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  submitJob() {
    if (this.jobsform.invalid)
      return void alert("Please fill required fields");
    const formdata = new FormData;
    formdata.append("J_Name", this.jobsform.value.J_Name),
      formdata.append("E_id", this.jobsform.value.E_id),
      formdata.append("Machine_id", this.jobsform.value.Machine_id),
      formdata.append("Material_id", this.jobsform.value.Material_id),
      formdata.append("Material_Issued", this.jobsform.value.Material_Issued),
      this.selectedFile && formdata.append("DesignFile", this.selectedFile),
      this._rest.JobAdded(formdata).subscribe((data: any) => {
        alert(data.message),
          this.jobsform.reset(),
          this.AllJobs()
      }, (err: any) => {
        alert(err.error.message)
      }
      )
  }

  FormatIssuedMaterial() {
    let t = this.jobsform.get("Material_Issued")?.value;
    if (t) {
      t = t.toString().trim();
      const r = t.replace(/[^0-9.]/g, "");
      r && this.jobsform.patchValue({
        Material_Issued: `${r} Kg`
      })
    }
  }

  editjobs(Job_id: number) {
    const r = this.Alljob.find(o => o.Job_id === Job_id);
    r && (this.SelectedJob = 1,
      this.Editjobsform.patchValue(r))
  }

  onFileChange(event: any, fieldName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.Editjobsform.patchValue({ [fieldName]: file });
    }
  }


  // onFileChange(event:any, fieldName:string) {
  //   const file = event.target.files[0];
  //   o && this.Editjobsform.patchValue({
  //     [r]: o
  //   })
  // }

  JobUpdates() {
    const t = new FormData;
    Object.keys(this.Editjobsform.controls).forEach(r => {
      t.append(r, this.Editjobsform.get(r)?.value)
    }
    ),
      this._rest.UpdatedAJobnewTable(this.Editjobsform.value.Job_id, t).subscribe(r => {
        console.log("Update success", r),
          this.Editjobsform.reset(),
          this.ngOnInit()
      }
        , r => {
          console.error("Update error", r)
        }
      )
  }

  Allemp() {
    this._rest.AllOnlyEmployee().subscribe((data: any) => {
      console.log(data),
        this.AllEmployee = data.data
    }, (err: any) => {
      console.log(err)
    }
    )
  }

  AllQCData() {
    this._rest.AllOnlyQC().subscribe((data: any) => {
      console.log(data),
        this.AllQC = data.data
    }, (err: any) => {
      console.log(err)
    }
    )
  }

  ALLMaterial() {
    this._rest.AllMaterialTypes().subscribe((data: any) => {
      console.log(data),
        this.AllMaterial = data.data
    }, (err: any) => {
      console.log(err);
    }
    )
  }

  AllMachines() {
    this._rest.AvailbleMachine().subscribe((data: any) => {
      console.log(data),
        this.AlMachines = data.data
    }, (err: any) => {
      console.log(err)
    }
    )
  }

  Delete(Job_id: number) {
    confirm("Are you sure to delete this Job ?") && this._rest.JobtableDelete(Job_id).subscribe(r => {
      alert("Job Deleted Successfully"),
        this.AllJobs()
    }, (err: any) => {
      console.log(err)
    });
  }

}