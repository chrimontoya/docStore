import {Component, inject, OnInit, signal} from '@angular/core';
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
  documentsService: DocumentService = inject(DocumentService);
  documents: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  searchControl = new FormControl('');
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
