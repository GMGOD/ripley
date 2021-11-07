import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Usuario {
  Id: number;
  Nombre: string;
  Email: string;
}

@Component({
  selector: 'ModalUsuario',
  templateUrl: './dialogo.component.html',
})
export class DialogoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}