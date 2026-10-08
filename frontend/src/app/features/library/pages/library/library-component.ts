import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {UploadDocument} from '../../../../shared/components/upload-document/upload-document';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocumentTableComponent} from '../../../document/components/document-table-component';
import {DocumentService} from '../../../document/services/document.service';
import {DynamicDialogComponent} from '../../../../shared/components/dynamic-dialog/dynamic-dialog-component';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatList, MatListItem} from '@angular/material/list';
import {Tag} from '../../../../core/models/tag.model';
import {MatIcon} from '@angular/material/icon';
import {TAG_COLORS} from '../../../../core/constants/tag-colors.const';
import {TagChipComponent} from '../../../../shared/components/tag-chip/tag-chip-component';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {ColorPickerComponent} from '../../../../shared/components/./color-picker/color-picker-component';
import {Color} from '../../../../core/models/color.model';

@Component({
  imports: [
    MatTableModule,
    MatButton,
    ReactiveFormsModule,
    DocumentTableComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatList,
    MatListItem,
    MatIconButton,
    MatIcon,
    TagChipComponent,
    MatRadioGroup,
    MatRadioButton,
    ColorPickerComponent,
  ],
  selector: 'app-library-component',
  styleUrl: './library-component.scss',
  templateUrl: './library-component.html',
})
export class LibraryComponent {
  @ViewChild("tagCreator")
  tagCreator!: TemplateRef<any>;
  dialogRef = inject(MatDialog);
  documentsService: DocumentService = inject(DocumentService);
  tags: Tag[] = [];
  nameTagControl = new FormControl();

  get colors(){
    return TAG_COLORS.map(color => new Color(color.id, color.name, color.color));
  }

  constructor(private cdr: ChangeDetectorRef) {

  }

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

  openTagCreatorDialog() {
    const ref = this.dialogRef.open(DynamicDialogComponent, {
      data: {
        title: "Administrar Etiquetas",
        templateRef: this.tagCreator,
        actions: [
          {
            label: 'Cancelar',
            action: () => {
              ref.close();
            }
          },
          {
            label: 'Guardar',
            action: () => {

            }
          }
        ],
      },
      maxHeight: '70%',
      disableClose: true,
    });
  }

  addTag(): void {
    if (this.nameTagControl.valid && this.nameTagControl.value) {
      this.tags.push(new Tag((this.tags.length + 1), this.nameTagControl.value, this.colors[0].color));
      this.nameTagControl.setValue('');
    }
  }

  selectTagColor(tagId: number, colorId: number): void {
    const color = this.colors.find((item) => item.id === colorId);

    if (!color) {
      return;
    }

    this.tags = this.tags.map((tag) =>
      tag.idTag === tagId
        ? new Tag(tag.idTag, tag.tagName, color.color)
        : tag
    );
    console.log('mount');
  }

  deleteTag(tag: Tag){
    this.tags.splice(this.tags.indexOf(tag), 1);
  }
}
