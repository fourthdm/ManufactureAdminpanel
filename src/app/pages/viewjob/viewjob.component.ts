import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewjob',
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.css']
})
export class ViewjobComponent {

  
  AllJob: any[] = [];
  dwgViewerUrl: string = '';
  constructor(private _rest: RestService, private _activatedRoute: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this._activatedRoute.params.subscribe((params: Params) => {
  //     const J_id = params['J_id'];

  //     this._rest.ALLJobsById(J_id).subscribe((data: any) => {
  //       console.log('API Data:', data);
  //       this.AllJob = data.data;

  //       const designFileUrl = Array.isArray(this.AllJob)
  //         ? (this.AllJob[0] as any)?.DesignFile : (this.AllJob as any)?.DesignFile;

  //       if (designFileUrl) {
  //         // ensure full URL (backend must serve file publicly)
  //         const fullFileUrl = designFileUrl.startsWith('http')
  //           ? designFileUrl
  //           : `http://localhost:3000/${designFileUrl}`;

  //         console.log('DWG File URL:', fullFileUrl);

  //         this.dwgViewerUrl = `https://sharecad.org/cadframe/load?url=${encodeURIComponent(fullFileUrl)}`;
  //       } else {
  //         console.error('❌ No DWG file URL found');
  //       }
  //     });
  //   });
  // }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      const J_id = params['J_id'];
      this._rest.ALLJobsById(J_id).subscribe((data: any) => {
        this.AllJob = data.data;
        if (this.AllJob.length > 0) {
          const designFileUrl = this.AllJob[0].DesignFile;
          this.dwgViewerUrl = `https://sharecad.org/cadframe/load?url=${encodeURIComponent(designFileUrl)}`;
        }
      }, (err: any) => {
        console.log(err);
      });
    });
  }

}
