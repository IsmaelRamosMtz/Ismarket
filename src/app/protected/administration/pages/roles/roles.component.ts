import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RolesService } from '../../services/roles.service';
import { Roles } from '../../../../auth/interfaces/Roles';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: [
    `
      table {
        width: 100%;
      }

      .mat-form-field {
        font-size: 14px;
        width: 40%;
      }

      button {
        width: 30%;
        float: right;
      }
    `
  ]
})
export class RolesComponent implements OnInit {

  //#region Variables para guardar la data y mostrarla en la tabla
  rolesArray: any;
  displayedColumns: string[] = ['No','Rol', 'Descripción', 'buttons'];
  dataSourceRoles: any;
  //#endregion
  
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator | undefined;

  @ViewChild(MatSort, { static: true })
  sort: MatSort | undefined;

  constructor(
    private _fb: FormBuilder,
    private _matDialog: MatDialog,
    private _rolesService: RolesService,
    private _authService:AuthService
  ) { }

  ngOnInit(): void {
    this._authService.verificarSesion();
    this.lists();
    
  }

  async lists(): Promise<any> {
    await this.rolesList();
  }

  //#region Search
  doFilter = (value: any) => {
    this.dataSourceRoles.filter = value.target.value.trim().toLocaleLowerCase();
  }
  //#endregion search 

  //#region Listas
  rolesList() {
    this._rolesService.rolesList().subscribe(resp => {
      this.rolesArray = [...resp];
      this.dataSourceRoles = new MatTableDataSource(this.rolesArray);
      this.dataSourceRoles.sort = this.sort;
      this.dataSourceRoles.paginator = this.paginator;
      console.log(resp);
    });
  }
  //#endregion listas

  //#region Actions Form
  roles_form(type: string, id?: any): any {
    switch (type) {
        case 'create':
            this.rolesCreate(type);
            break;
        // case 'update':
        //     this.roles_dialog_edit(type, id);
        //     break;
    }
}
  //#endregion

  //#region DIALOG
  rolesCreate(type: string): void {
    const dialogRef = this._matDialog.open(RolesFormComponent, {
      disableClose: true,
      height: '43%',
      width: '33%',
      data: { type }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.rolesList();
    });
  }
  
}
