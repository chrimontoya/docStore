import {Component, inject, Input, signal, TemplateRef, ViewChild} from '@angular/core';
import {DynamicTableComponent} from '../../../shared/components/dynamic-table/dynamic-table-component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Document} from '../../../core/models/document.model';
import {DocumentService} from '../services/document.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {TableAction, TableConfig} from '../../../shared/classes/table.class';
import {LibraryColumns} from '../../../shared/forms/library-columns';
import {DynamicDialogComponent} from '../../../shared/components/dynamic-dialog/dynamic-dialog-component';
import {Action} from '../../../shared/classes/action.interface';
import {DOCUMENT_STATUS} from '../../../core/constants/document-status.const';
import {DOCUMENT_CONTEXT} from '../../../core/constants/document-context.const';

type DocumentContext = 'library' | 'trash';

@Component({
  imports: [
    DynamicTableComponent,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  selector: 'app-document-table-component',
  styleUrl: './document-table-component.scss',
  templateUrl: './document-table-component.html',
})
export class DocumentTableComponent {
  @Input() documentContext: DocumentContext = 'library';
  @ViewChild('documentViewTemplate')
  documentViewTemplate!: TemplateRef<{ $implicit: Document }>;
  documentsService: DocumentService = inject(DocumentService);
  documents: Document[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  searchControl = new FormControl('');
  dialogRef = inject(MatDialog);
  formatSelected = signal(this.formats[0].value);

  actionsConfig: Record<DocumentContext, TableAction<Document>[]> = {
    library: [
      {
        id: '1',
        label: 'Ver detalle',
        icon: 'remove_red_eye',
        action: (row: Document) => this.viewDetail(row),
      },
      {
        id: '2',
        label: 'Descargar',
        icon: 'download',
        action: (row: Document) => this.download(row),
      },
      {
        id: '3',
        label: 'Borrar',
        icon: 'delete',
        action: (row: Document) => this.restoreDocument(row),
      },
    ],
    trash: [
      {
        id: '1',
        label: 'Restaurar',
        icon: 'restore_from_trash',
        action: (row: Document) => this.restoreDocument(row),
      },
      {
        id: '2',
        label: 'Eliminar definitivamente',
        icon: 'delete',
        action: (row: Document) => this.delete(row),
      },
    ],
  }

  get config(): TableConfig<Document> {
    return {
      columns: LibraryColumns,
      actions: this.actionsModule,
    };
  }

  get actionsModule(): TableAction<Document>[] {
    return this.actionsConfig[this.documentContext];
  }

  get formats() {
    return [
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
  }

  get status() {
    return this.documentContext == DOCUMENT_CONTEXT.LIBRARY ? DOCUMENT_STATUS.ACTIVE : DOCUMENT_STATUS.TRASH;
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
    this.documentsService.find(this.status).subscribe({
      next: (res) => {
        this.dataSource.data = res;
      }
    });
  }

  selectFormat(event: Event) {
    this.formatSelected.set((event.target as HTMLSelectElement).value);
    this.applyFilter(event);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetail(document: Document) {

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
                    if (res) {
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
        if (res) {
          this.documentsService.downloadFile(res, document.originalFilename);
        }
      })
  }

  restoreDocument(document: Document) {

    this.documentsService.setStatusDocument(document.id, this.documentContext === DOCUMENT_CONTEXT.TRASH ? DOCUMENT_STATUS.ACTIVE : DOCUMENT_STATUS.TRASH)
      .subscribe((res) => {
        if (res) {

        }
      });
  }

  delete(document: Document) {
    this.documentsService.deleteDocument(document.id)
      .subscribe((res) => {
        if (res) {

        }
      });
  }
}
