import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-designerjob',
  templateUrl: './designerjob.component.html',
  styleUrls: ['./designerjob.component.css']
})
export class DesignerjobComponent {
 pro: any;

  AllDesiignJobs: any[] = [];

  desiggn: any;
  Designers: any[] = [];

  dwgViewerUrl: string = '';
  ModelUrl: string = '';

  AddFormDesignJobs: FormGroup;
  EditDesignJobs: FormGroup;

  SelectedJobs: any = undefined;
  selectedFile: File | null = null;

  SelectedAsssignJobs: any = undefined;

  constructor(private _rest: RestService, private fb: FormBuilder, private _state: StateService) {

    this.AddFormDesignJobs = this.fb.group({
      JobName: [''],
      DsignFile: [''],
      ModelFile: [''],
      DesignBy: ['']
    });

    this.EditDesignJobs = this.fb.group({
      Job_Id: [''],
      JobName: ['', Validators.required],
      DsignFile: [''],
      ModelFile: [''],
      DesignBy: ['']
    });

  }

  ngOnInit(): void {
    this.AllDesign();
    this.AllDesigners();
    // this.desiggn = this._state.getLoggedInUser();
  }


  AllDesigners() {
    this._rest.AllDesigner().subscribe((data: any) => {
      this.Designers = data.data;
      console.log(data);
    }, (err: any) => {
      console.log(err);
    });
  }

  AllDesign() {
    this._rest.AllDesigns().subscribe((data: any) => {
      console.log(data);
      this.AllDesiignJobs = data.data;
      if (this.AllDesiignJobs.length > 0) {
        const designFileUrl = this.AllDesiignJobs[0].DsignFile;
        const ModelfileUrl = this.AllDesiignJobs[0].ModelFile;
        this.dwgViewerUrl = `https://sharecad.org/cadframe/load?url=${encodeURIComponent(designFileUrl)}`;
        this.ModelUrl = `https://sharecad.org/cadframe/load?url=${encodeURIComponent(ModelfileUrl)}`
      }
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
    if (this.AddFormDesignJobs.invalid) {
      alert('Please fill in all required fields!');
      return;
    }
    const formData = new FormData();
    // Append all form values
    Object.keys(this.AddFormDesignJobs.controls).forEach(key => {
      formData.append(key, this.AddFormDesignJobs.get(key)?.value);
    });

    // Append file if selected
    if (this.selectedFile) {
      formData.append('DsignFile', this.selectedFile);
      formData.append('ModelFile', this.selectedFile);
    }

    // ✅ Send POST request to Node API
    this._rest.AddDesignjob(formData).subscribe({
      next: (response: any) => {
        if (response.success) {
          // alert('✅ Job added successfully and machine assigned!');
          this.AddFormDesignJobs.reset();
          this.ngOnInit();
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

  editAssignjobs(Job_Id: number) {
    const Assignjobs = this.AllDesiignJobs.find(A => A.Job_Id === Job_Id);
    if (Assignjobs) {
      this.SelectedAsssignJobs = 1;
      this.EditDesignJobs.patchValue(Assignjobs);
    }
  }

  onFileChange(event: any, fieldName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.EditDesignJobs.patchValue({ [fieldName]: file });
    }
  }

  AssignJobUpdates(): void {
    const formData = new FormData();
    Object.keys(this.EditDesignJobs.controls).forEach(key => {
      formData.append(key, this.EditDesignJobs.get(key)?.value);
    });
    // Update form data 
    this._rest.UpdateDesignJob(this.EditDesignJobs.value.Job_Id, formData).subscribe(
      response => {
        console.log('Update success', response);
        this.EditDesignJobs.reset();
        this.ngOnInit();
      },
      error => {
        console.error('Update error', error);
      });
  }

  Delete(Job_Id: number) {
    this._rest.DeleteDesign(Job_Id).subscribe((data: any) => {
      console.log(data);
      this.AllDesiignJobs = data.data;
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
