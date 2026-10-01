import {Component, inject} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {UploadDocument} from '../../../../shared/components/upload-document/upload-document';
import {ReactiveFormsModule} from '@angular/forms';
import {DocumentTableComponent} from '../../../document/components/document-table-component';
import {DocumentService} from '../../../document/services/document.service';

@Component({
  imports: [
    MatTableModule,
    MatButton,
    ReactiveFormsModule,
    DocumentTableComponent,
  ],
  selector: 'app-library-component',
  styleUrl: './library-component.scss',
  templateUrl: './library-component.html',
})
export class LibraryComponent {
  dialogRef = inject(MatDialog);
  documentsService: DocumentService = inject(DocumentService);

  openUploadDialog(): void {
    const ref = this.dialogRef.open(UploadDocument);
    ref.componentInstance.actionEvent.subscribe((res) => {
      if (res) {
        this.documentsService.uploadFiles(res)
          .subscribe((res) => {
            if (res) {
              ref.close();
            }
          })
      }
    })
  }
}
