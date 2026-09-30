import {Component, inject, OnInit} from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {UploadDocument} from '../../../../shared/components/upload-document/upload-document';
import {TableConfig} from '../../../../shared/classes/table.class';
import {LibraryColumns} from '../../../../shared/forms/library-columns';
import {DynamicTableComponent} from '../../../../shared/components/dynamic-table/dynamic-table-component';

@Component({
  imports: [
    MatTableModule,
    MatButton,
    DynamicTableComponent,
  ],
  selector: 'app-library-component',
  styleUrl: './library-component.scss',
  templateUrl: './library-component.html',
})
export class LibraryComponent implements OnInit {
  documentsService: DocumentService = inject(DocumentService);
  documents: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  uploadDialogRef = inject(MatDialog);
  config: TableConfig<any> = {
    columns: LibraryColumns,
    actions: <any>[
      {
        id: '1',
        label: 'Ver detalle',
        icon: 'edit',
        action: (row: any) => {

        }
      },
      {
        id: '2',
        label: 'Descargar',
        icon: 'download',
        action: (row: any) => {

        }
      },
      {
        id: '3',
        label: 'Borrar',
        icon: 'trash',
        action: (row: any) => {

        }
      },
    ],
  };

  ngOnInit() {
    this.documentsService.find().
      subscribe({
      next: (res) => {
        this.dataSource.data = res;
      }
    });
  }

  openUploadDialog(): void {
    const ref = this.uploadDialogRef.open(UploadDocument);
    ref.componentInstance.actionEvent.subscribe((res) => {
      if (res){
        this.documentsService.uploadFiles(res)
          .subscribe((res) => {
            if (res){
              ref.close();
            }
          })
      }
    })
  }
}
