import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ViewemployeeComponent } from './pages/viewemployee/viewemployee.component';
import { ViewmachinesComponent } from './pages/viewmachines/viewmachines.component';
import { MachineComponent } from './pages/machine/machine.component';
import { MaterialComponent } from './pages/material/material.component';
import { JobComponent } from './pages/job/job.component';
import { ViewjobComponent } from './pages/viewjob/viewjob.component';
import { AsssignjobComponent } from './pages/asssignjob/asssignjob.component';
import { DesignerjobComponent } from './pages/designerjob/designerjob.component';

const routes: Routes = [
  { path: ' ', redirectTo: 'login', pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  {
    path: 'Home', component: HomeComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'Admin', component: AdminComponent },
      { path: 'Employee', component: EmployeeComponent },
      { path: 'EmployeeInformation/:E_id', component: ViewemployeeComponent },
      { path: 'Machine', component: MachineComponent },
      { path: 'MachinesDetails/:Machine_id', component: ViewmachinesComponent },
      { path: 'Material', component: MaterialComponent },
      { path: 'Job', component: JobComponent },
      { path: 'Jobss', component: JobComponent },
      { path: 'JobInformation/:J_id', component: ViewjobComponent },
      { path: 'AssignJob', component: AsssignjobComponent },
      { path: 'DesingerJob', component: DesignerjobComponent },
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
