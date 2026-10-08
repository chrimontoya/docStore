import {Component, EventEmitter} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FileUploadControl, FileUploadModule, FileUploadValidators} from '@iplab/ngx-file-upload';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatChipListbox, MatChipOption} from '@angular/material/chips';
import {Control} from '../../classes/control.class';
import {createFormGroup} from '../../helpers/form.helper';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  imports: [
    MatDialogModule,
    MatButton,
    FileUploadModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatChipListbox,
    MatChipOption,
    ReactiveFormsModule,
  ],
  selector: 'app-upload-document',
  styleUrl: './upload-document.scss',
  templateUrl: './upload-document.html',
})
export class UploadDocument {
  public readonly fileUploadControl = new FileUploadControl(
    { multiple: true },
    FileUploadValidators.fileSize(80000)
  );

  title: string = 'File test';
  description: string = 'Upload document';
  actionEvent: EventEmitter<any> = new EventEmitter();
  controls: Control[] = [
    new Control(
      {
        name:  "title",
        type: "text",
        label: "Título",
        order: 1,
      }
    ),
    new Control({
      name:  "description",
      type: "text",
      label: "Description",
      order: 2,
    })
  ];
  formGroup = createFormGroup(this.controls, []);

  uploadContent() {
    this.actionEvent.emit(this.fileUploadControl.value);
  }

}
