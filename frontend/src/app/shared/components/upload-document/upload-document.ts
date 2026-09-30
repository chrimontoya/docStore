import {Component, EventEmitter} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FileUploadControl, FileUploadModule, FileUploadValidators} from '@iplab/ngx-file-upload';

@Component({
  imports: [
    MatDialogModule,
    MatButton,
    FileUploadModule,
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

  uploadContent() {
    this.actionEvent.emit(this.fileUploadControl.value);
  }

}
