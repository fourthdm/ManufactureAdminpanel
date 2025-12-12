import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { LoginComponent } from './common/login/login.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AsssignjobComponent } from './pages/asssignjob/asssignjob.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DesignerjobComponent } from './pages/designerjob/designerjob.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { HomeComponent } from './pages/home/home.component';
import { JobComponent } from './pages/job/job.component';
import { MachineComponent } from './pages/machine/machine.component';
import { MaterialComponent } from './pages/material/material.component';
import { ViewemployeeComponent } from './pages/viewemployee/viewemployee.component';
import { ViewjobComponent } from './pages/viewjob/viewjob.component';
import { ViewmachinesComponent } from './pages/viewmachines/viewmachines.component';
import { SafeurlPipe } from './safeurl.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    AdminComponent,
    AsssignjobComponent,
    DashboardComponent,
    DesignerjobComponent,
    EmployeeComponent,
    HomeComponent,
    JobComponent,
    MachineComponent,
    MaterialComponent,
    ViewemployeeComponent,
    ViewjobComponent,
    ViewmachinesComponent,
    SafeurlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
