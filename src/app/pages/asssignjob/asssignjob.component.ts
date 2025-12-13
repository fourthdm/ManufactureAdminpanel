import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-asssignjob',
  templateUrl: './asssignjob.component.html',
  styleUrls: ['./asssignjob.component.css']
})
export class AsssignjobComponent {

  pro: any;
  
  AssignjobForm: FormGroup;
  UpateformAssignjob: FormGroup;

  ASSGINJObs: any[] = [];
  Designers: any[] = [];

  SelectedJobs: any = undefined;
  selectedFile: File | null = null;

  SelectedAsssignJobs: any = undefined;

  constructor(private _rest: RestService, private fb: FormBuilder) {
    this.AssignjobForm = this.fb.group({
      Job_Name: new FormControl('', [Validators.required]),
      DesignerName: new FormControl('', [Validators.required]),
      QuestionFile: new FormControl(''),
      Question: new FormControl('')
    });

    this.UpateformAssignjob = this.fb.group({
      AJob_id: new FormControl(''),
      Job_Name: new FormControl('', [Validators.required]),
      DesignerName: new FormControl('', [Validators.required]),
      QuestionFile: new FormControl(null),
      Question: new FormControl('')
    });
  }


  ngOnInit(): void {
    this.AllAssignJobs();
    this.AllDesigners();
  }

  AllAssignJobs() {
    this._rest.AllAssignsJobs().subscribe((data: any) => {
      this.ASSGINJObs = data.data;
      console.log(data);
    }, (err: any) => {
      console.log(err);
    });
  }

  AllDesigners() {
    this._rest.AllDesigner().subscribe((data: any) => {
      this.Designers = data.data;
      console.log(data);
    }, (err: any) => {
      console.log(err);
    });
  }

  // 📁 Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // 🚀 Submit form
  onSubmit() {
    if (this.AssignjobForm.invalid) {
      alert('Please fill in all required fields!');
      return;
    }

    const formData = new FormData();

    // Append all form values
    Object.keys(this.AssignjobForm.controls).forEach(key => {
      formData.append(key, this.AssignjobForm.get(key)?.value);
    });

    // Append file if selected
    if (this.selectedFile) {
      formData.append('QuestionFile', this.selectedFile);
    }

    // ✅ Send POST request to Node API
    this._rest.AssignJobADD(formData).subscribe({
      next: (response: any) => {
        if (response.success) {
          // alert('✅ Job added successfully and machine assigned!');
          this.AssignjobForm.reset();
          this.ASSGINJObs = response.data
        } else {
          alert('⚠️ ' + response.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error while adding job: ' + (err.error?.message || err.message));
      }
    });
  }

  editAssignjobs(AJob_id: number) {
    const Assignjobs = this.ASSGINJObs.find(A => A.AJob_id === AJob_id);
    if (Assignjobs) {
      this.SelectedAsssignJobs = 1;
      this.UpateformAssignjob.patchValue(Assignjobs);
    }
  }

  onFileChange(event: any, fieldName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.UpateformAssignjob.patchValue({ [fieldName]: file });
    }
  }


  AssignJobUpdates(): void {
    const formData = new FormData();
    Object.keys(this.UpateformAssignjob.controls).forEach(key => {
      formData.append(key, this.UpateformAssignjob.get(key)?.value);
    });
    // Update form data 
    this._rest.AssignjobsUpdate(this.UpateformAssignjob.value.AJob_id, formData).subscribe(
      response => {
        console.log('Update success', response);
        this.UpateformAssignjob.reset();
        this.ngOnInit();
      },
      error => {
        console.error('Update error', error);
      });
  }

  Delete(AJob_id: number) {
    this._rest.DeleteAssignJobs(AJob_id).subscribe((data: any) => {
      console.log(data);
      this.ASSGINJObs = data.data;
    }, (err: any) => {
      console.log(err);
    });
  }

  downloadFromUrl(fileUrl: string) {
    const fileName = fileUrl.split('/').pop();   // extract file name

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName ?? 'file';   // force download
    a.target = "_blank";
    a.click();
  }

}
