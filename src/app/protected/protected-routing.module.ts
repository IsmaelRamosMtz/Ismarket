import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './administration/pages/home/home.component';
import { RolesComponent } from './administration/pages/roles/roles.component';
import { UsersComponent } from './administration/pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'roles',
        component: RolesComponent
      }, 
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
