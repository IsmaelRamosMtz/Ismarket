import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProtectedRoutingModule } from './protected-routing.module';
import { HomeComponent } from './administration/pages/home/home.component';
import { RolesComponent } from './administration/pages/roles/roles.component';
import { UsersComponent } from './administration/pages/users/users.component';
import { RolesFormComponent } from './administration/pages/roles/roles-form/roles-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    RolesComponent,
    UsersComponent,
    RolesFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ProtectedRoutingModule,
  ]
})
export class ProtectedModule { }
