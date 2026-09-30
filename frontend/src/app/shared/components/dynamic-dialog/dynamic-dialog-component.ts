import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {DialogTemplateData} from '../../../core/models/dialog-template-data.model';
import {NgTemplateOutlet} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgTemplateOutlet,
    MatIcon
  ],
  selector: 'app-dynamic-dialog-component',
  styleUrl: './dynamic-dialog-component.scss',
  templateUrl: './dynamic-dialog-component.html',
})
export class DynamicDialogComponent<T> {
  dialogData: DialogTemplateData<T> = inject(MAT_DIALOG_DATA);

  constructor() {
    console.log(this.dialogData);
  }
}
