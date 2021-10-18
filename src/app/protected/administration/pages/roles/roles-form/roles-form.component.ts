import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Roles } from 'src/app/auth/interfaces/Roles';
import { RolesService } from '../../../services/roles.service';
import { ValidatorService } from '../../../services/validator.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styles: [
  ]
})
export class RolesFormComponent implements OnInit {

  //#region Global Variabls
  type: string = '';

  titleForm: string = '';

  selectRol: any;

  rol: Roles = {
    id: 0,
    roleName: '',
    descripcion: ''
  }
  //#endregion

  constructor(
    private _fb: FormBuilder,
    private _rolesService: RolesService,
    private _validatorService: ValidatorService,
    public matDialogRef: MatDialogRef<RolesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) { 
  }

  ngOnInit(): void {
    this.type = this._data.type;
    if(this.type =='create'){
      this.titleForm = 'Nuevo Rol';
      this.rol.roleName = '';
      this.rol.descripcion = '';
    }
  }

  //#region FORMULARIOS AND VALIDATIIONS OF FORMS
  rolesForm: FormGroup = this._fb.group({
    roleName: ['', [Validators.required]],
    descripcion: ['', [Validators.required]]
  })

  campoNoValido(campo: string) {
    return (
      this.rolesForm.controls[campo].errors &&
      this.rolesForm.controls[campo].touched
    );
  }
  //#endregion FORMULARIOS
  
  //#region Services REST
  saveRole(){
    this.rol.roleName = this.rolesForm.get('roleName')?.value;
    this.rol.descripcion = this.rolesForm.get('descripcion')?.value;
    const newRole = {
      roleName: this.rol.roleName,
      descripcion: this.rol.descripcion
    }
    // console.log(newRole);
    this._rolesService.rolesCreate(newRole).subscribe(resp => {
      console.log(resp);
    })
  }
  //#endregion

}
