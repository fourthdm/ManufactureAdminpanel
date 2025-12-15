import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  Url = 'http://localhost:3000';

  constructor(private _http: HttpClient, private _state: StateService) { }

  Login(data: any) {
    return this._http.post(this.Url + '/Adminlogin', data);
  }

  EmployeeLogin(data: any) {
    return this._http.post(this.Url + '/EmployeeLogin', data);
  }

  Addadmin(data: any) {
    return this._http.post(this.Url + '/AddAdmin', data);
  }

  AllAdmin() {
    return this._http.get(this.Url + '/AllAdmin');
  }

  UpdateAdmin(data: any) {
    this._state.CheckToken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    return this._http.put(this.Url + '/UpdateAdmin/' + data.Admin_id, data, { headers });
  }

  DeleteAdmin(Admin_id: any) {
    this._state.CheckToken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    return this._http.delete(this.Url + '/DeleteAdmin/' + Admin_id, { headers });
  }
  //Admin APIs

  //Employee APIs
  AddEmployee(data: any) {
    this._state.CheckToken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    return this._http.post(this.Url + '/AddEmployee', data, { headers });
  }

  UpdateEmployee(data: any) {
    this._state.CheckToken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    return this._http.put(this.Url + '/UpdateEmployee/' + data.E_id, data, { headers });
  }

  Allemployeedata() {
    return this._http.get(this.Url + '/AllEmployee');
  }

  EmployeedatabyId(E_id: any) {
    return this._http.get(this.Url + '/EmployeedatabyId/' + E_id);
  }

  DeleteEmployee(E_id: any) {
    this._state.CheckToken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    return this._http.delete(this.Url + '/DeleteEmployee/' + E_id, { headers });
  }

  AllOnlyEmployee() {
    return this._http.get(this.Url + '/FindEmployeeNameWithEmp');
  }

  AllOnlyQC() {
    return this._http.get(this.Url + '/FindaEmployeeNamewithaQC');
  }

  AllDesigner() {
    return this._http.get(this.Url + '/OnlyAllDesigner');
  }
  //Employee APIs

  //Machine APIs
  AddMachine(data: any) {
    return this._http.post(this.Url + '/AddMachine', data);
  }

  AllMachine() {
    return this._http.get(this.Url + '/AllMachines');
  }

  UpdateMachine(data: any) {
    return this._http.put(this.Url + '/UpdateMachine/' + data.Machine_id, data);
  }

  DeleteMachine(Machine_id: any) {
    return this._http.delete(this.Url + '/DeleteMachine/' + Machine_id);
  }

  MachineById(Machine_id: any) {
    return this._http.get(this.Url + '/GetMachine/' + Machine_id);
  }

  AvailbleMachine() {
    return this._http.get(this.Url + '/AvailableMachines');
  }

  //Machine APIs

  //Material API Start

  AddMAterialS(data: any) {
    return this._http.post(this.Url + '/AddMaterial', data);
  }

  UpdateMaterial(data: any) {
    return this._http.put(this.Url + '/UpdateMaterial/' + data.Material_id, data);
  }

  AllMaterials() {
    return this._http.get(this.Url + '/ALLMaterial');
  }

  AllMaterialTypes() {
    return this._http.get(this.Url + '/Materialbygroup');
  }

  MaterialByid(Material_id: any) {
    return this._http.get(this.Url + '/MaterialbyId/' + Material_id);
  }

  MaterialByWeights(data: any) {
    return this._http.post(this.Url + '/MaterialByWeight', data);
  }

  MaterialByName(data: any) {
    return this._http.post(this.Url + '/MaterialbyMaterialName', data);
  }

  MaterialBySize(data: any) {
    return this._http.post(this.Url + '/MaterialByMaterialsize', data);
  }

  MaterialByType(data: any) {
    return this._http.post(this.Url + '/MaterialByMaterialtype', data);
  }

  DeleteMaterial(Material_id: number) {
    return this._http.delete(this.Url + '/DeleteMaterial/' + Material_id);
  }
  // Material API Ends

  //API start for a Jobs

  // AddJOBS(formData: FormData) {
  //   return this._http.post(this.Url + '/AddJobs', formData);
  // }

  AddJOBS(formData: FormData) {
    return this._http.post(this.Url + '/NewAddJob', formData);
  }

  ALLJobs() {
    return this._http.get(this.Url + '/AllJobs');
  }

  // ALLJobs() {
  //   return this._http.get(this.Url + '/AllNewjobtable');
  // }

  ALLJobsById(J_id: number) {
    return this._http.get(this.Url + '/AlljobsByID/' + J_id);
  }
  //API Ends 


  //Add job API with new database tables job

  JobAdd(formData: FormData) {
    return this._http.post(this.Url + '/NewAddJob', formData);
  }

  JobData() {
    return this._http.get(this.Url + '/AllNewjobtable');
  }

  JobStart(job_id: any) {
    return this._http.post(this.Url + '/StartJob', job_id);
  }

  JobPause(job_id: any) {
    return this._http.post(this.Url + '/PauseJob', job_id);
  }

  JobResume(job_id: any) {
    return this._http.post(this.Url + '/ResumeJob', job_id);
  }

  JobComplete(job_id: any) {
    return this._http.post(this.Url + '/CompleteJob', job_id);
  }

  QCStartJobs(job_id: any) {
    return this._http.post(this.Url + '/StartQC', job_id);
  }

  QCEndJobs(job_id: any) {
    return this._http.post(this.Url + '/EndQC', job_id);
  }

  JobDispatch(job_id: any) {
    return this._http.post(this.Url + '/DispatchJob', job_id);
  }

  //Add job API with new database tables job

  AssignJobADD(formData: FormData) {
    return this._http.post(this.Url + '/AddAassignJob', formData);
  }

  AssignjobsUpdate(AJob_id: number, formdata: FormData) {
    return this._http.put(this.Url + '/AssignJobUpdate/' + AJob_id, formdata);
  }

  AllAssignsJobs() {
    return this._http.get(this.Url + '/AllAssignJob');
  }

  DeleteAssignJobs(AJob_id: number) {
    return this._http.delete(this.Url + '/DeleteAssignjob/' + AJob_id);
  }

  Assignjobsbyid(AJob_id: number) {
    return this._http.get(this.Url + '/AssignJobbyId/' + AJob_id);
  }

  //Assignjob ends
  AddDesignjob(formdata: FormData) {
    return this._http.post(this.Url + '/DesignerJobsAdded', formdata);
  }

  AllDesigns() {
    return this._http.get(this.Url + '/AllDesign');
  }

  AllDesignsbyid(Job_Id: number) {
    return this._http.get(this.Url + '/DesignjobbyId/' + Job_Id);
  }

  UpdateDesignJob(Job_Id: number, formdata: FormData) {
    return this._http.put(this.Url + '/UpdateDesignjob/' + Job_Id, formdata);
  }

  DeleteDesign(Job_Id: number) {
    return this._http.delete(this.Url + '/DeleteJobs/' + Job_Id);
  }

  //Job Table Data

  Jobtabledata() {
    return this._http.get(this.Url + '/jobtableAllData');
  }

  JobAdded(formdata: FormData) {
    return this._http.post(this.Url + '/JobAdded', formdata);
  }

  JobtableDelete(Job_id: number) {
    return this._http.delete(this.Url + '/JobtableDelete/' + Job_id);
  }

  UpdatedAJobnewTable(Job_id: number, formdata: FormData) {
    return this._http.put(this.Url + '/UpdatedAJobnewTable/' + Job_id, formdata);
  }

}
