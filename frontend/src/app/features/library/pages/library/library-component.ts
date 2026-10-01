import {Component, inject, OnInit, signal, TemplateRef, ViewChild} from '@angular/core';
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
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Action} from '../../../../shared/classes/action.interface';
import {Document} from '../../../../core/models/document.model';
import {DynamicDialogComponent} from '../../../../shared/components/dynamic-dialog/dynamic-dialog-component';

@Component({
  imports: [
    MatTableModule,
    MatButton,
    DynamicTableComponent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
  ],
  selector: 'app-library-component',
  styleUrl: './library-component.scss',
  templateUrl: './library-component.html',
})
export class LibraryComponent implements OnInit {
  @ViewChild('documentViewTemplate')
  documentViewTemplate!: TemplateRef<{ $implicit: Document }>;
  documentsService: DocumentService = inject(DocumentService);
  documents: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  searchControl = new FormControl('');
  dialogRef = inject(MatDialog);
  config: TableConfig<Document> = {
    columns: LibraryColumns,
    actions: [
      {
        id: '1',
        label: 'Ver detalle',
        icon: 'edit',
        action: (row: any) => this.viewDetail(row),
      },
      {
        id: '2',
        label: 'Descargar',
        icon: 'download',
        action: (row: any) => this.download(row),
      },
      {
        id: '3',
        label: 'Borrar',
        icon: 'trash',
        action: (row: any) => this.delete(row),
      },
    ],
  };


  formats = [
    {
      value: '',
      label: 'Todos los tipos',
    },
    {
      value: '.jpg',
      label: 'JPG',
    },
    {
      value: '.txt',
      label: 'TXT',
    },
    {
      value: '.pdf',
      label: 'PDF',
    }
  ];

  formatSelected = signal(this.formats[0].value);
  selectFormat(event: Event){
    this.formatSelected.set((event.target as HTMLSelectElement).value);
    this.applyFilter(event);
  }

  constructor() {
    this.dataSource.filterPredicate = (row, filter) => {
      const search = filter.toLowerCase();
      const format = this.formatSelected();
      const extension = String(row.extension ?? '').toLowerCase();
      const originalFilename = String(row.originalFilename ?? '').toLowerCase();
      const title = String(row.title ?? '').toLowerCase();

      const matchesFormat = format === '' || extension === format;
      const matchesSearch = !search ||
        [extension, originalFilename, title].some(value => value.includes(search));

      return matchesFormat && matchesSearch;
    };
  }

  ngOnInit() {
    this.documentsService.find().
      subscribe({
      next: (res) => {
        this.dataSource.data = res;
      }
    });
  }

  openUploadDialog(): void {
    const ref = this.dialogRef.open(UploadDocument);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetail(document: Document){

    const ref = this.dialogRef.open(DynamicDialogComponent<Document>,
      {
        data: {
          title: 'Ver detalle',
          data: document,
          templateRef: this.documentViewTemplate,
          actions: [
            {
              label: 'Cerrar',
              action: (row) => {
                ref.close();
              },
              color: "accent",
            },
            {
              label: 'Previsualizar',
              action: (row) => {
                  this.documentsService.getDocumentContent(row.id)
                    .subscribe((res) => {
                      if (res){
                        const url = URL.createObjectURL(res);
                        window.open(url, '_blank');
                        setTimeout(() => URL.revokeObjectURL(url), 1000);
                      }
                    })
              },
            },
          ] as Action<Document>[]
        }
      })
  }

  download(document: Document) {
    this.documentsService.getDocumentContent(document.id)
      .subscribe((res) => {
        if (res){
          this.documentsService.downloadFile(res, document.originalFilename);
        }
      })
  }

  delete(document: Document) {
    this.documentsService.moveToTrash(document.id)
      .subscribe((res) => {
          if (res){

          }
      });
  }
}
