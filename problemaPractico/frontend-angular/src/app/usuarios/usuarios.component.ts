import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Observable, Observer } from 'rxjs';
import { UsuarioService } from './usuarios.service'
import { DialogoComponent } from './dialogo/dialogo.component'

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {SelectionModel} from '@angular/cdk/collections';

export interface Usuarios {
  Id: number;
  Nombre: string;
  Email: string;
}

@Component({
  selector: 'Usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  public usuarios: any;

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650.1450, 1680.1890],
      type: 'line',
      areaStyle: {}
    }]
  }

  displayedColumns: string[] = ['select','posicion', 'nombre', 'email', 'modificar'];

  selection = new SelectionModel<Usuarios>(true, []);
  
  constructor(private _usuarioService: UsuarioService, public dialog: MatDialog, public snackBar: MatSnackBar){}

  ngOnInit() {
    this.getUsuarios();
  }

  openDialog(usuario: Usuarios | undefined): void {
    const dialogRef = this.dialog.open(DialogoComponent, {
      width: '250px',
      data: usuario === undefined ? {} : {...usuario},
    });

    dialogRef.afterClosed().subscribe((result: Usuarios) => {
      if(result !== undefined){

        if(result.Id !== undefined){
          this._usuarioService
          .setUsuarioData(result)
          .subscribe({
            next: (data: any) => {
              
              if(data.errors && data.errors.length > 0){
                this.snackBarOpen(data.errors[0].message, "Cerrar")
                // throw data.errors[0].message
              } else {
                this.usuarios = this.usuarios.map((usuario: Usuarios) => {
                  if(result.Id === usuario.Id){
                    return {
                      ...usuario,
                      Nombre: result.Nombre,
                      Email: result.Email
                    }
                  } else {
                    return usuario
                  }
                })
    
                this.snackBarOpen("Usuario guardado", "Cerrar")
              }
            },
            error: err => {
              console.error(err)
              this.snackBarOpen(err.toString(), "Cerrar")
            },
            complete: () => console.log('done loading usuarios')
          })
        } else {
          if(result.Email === undefined){
            this.snackBarOpen("Email no esta definido", "Cerrar")
            throw new Error("Email undefined");
          }

          if(result.Email === ''){
            this.snackBarOpen("Email esta vacio", "Cerrar")
            throw new Error("Email vacio");
          }

          if(result.Nombre === undefined){
            result = {
              ...result,
              Nombre: ""
            }
          }

          this._usuarioService
          .setNuevoUsuario(result)
          .subscribe({
            next: (data: any) => {
              
              if(data.errors && data.errors.length > 0){
                this.snackBarOpen(data.errors[0].message, "Cerrar")
                // throw data.errors[0].message
              } else {
                this.usuarios = [
                  ...this.usuarios,
                  data.data.crearUsuario
                ]
                console.log(this.usuarios, data.data.crearUsuario)
    
                this.snackBarOpen("Usuario guardado", "Cerrar")
              }
            },
            error: err => {
              console.error(err)
              this.snackBarOpen(err.toString(), "Cerrar")
            },
            complete: () => console.log('done loading usuarios')
          })
        }
        
      }
    });
  }

  getUsuarios() {
    console.log("getUsuarios")
    this._usuarioService
    .getTodosLosUsuarios()
    .subscribe({
      next: (data: any) => { this.usuarios = data.data.obtenerTodosLosUsuarios },
      error: err => {
        console.error(err)
        this.snackBarOpen(err.toString(), "Cerrar")
      },
      complete: () => console.log('done loading usuarios')
    })
  }

  modificarUsuario($id: Number){
    console.log($id, this.usuarios)
    this.openDialog(this.usuarios.find((usuario: Usuarios) => usuario.Id === $id))
  }

  agregarUsuario(){
    this.openDialog(undefined)
  }

  snackBarOpen(message: string, action: string){
    const snackbarRef = this.snackBar.open(message, action, {
      duration: 3000
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.usuarios.length;
    return numSelected === numRows;
  }

  isTwoSelected(Id: number | undefined = undefined) {
    if(Id !== undefined){
      let seleccionado = this.selection.selected.find((selection: Usuarios) => selection.Id === Id)
      return seleccionado ? false : (this.selection.selected.length >= 2 ? true : false)
    } else {
      return this.selection.selected.length >= 2;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.usuarios.forEach((usuario :Usuarios)  => this.selection.select(usuario));
  }

  comparar(){
    console.log(this.selection.selected)
  }
}

