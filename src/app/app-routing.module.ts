import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeesComponent } from "./list-employees/list-employees.component";
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [

  { redirectTo:'/list-employee.component',component:ListEmployeesComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: []
})
export class AppRoutingModule { }
