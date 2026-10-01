import { Component } from '@angular/core';
import {DocumentTableComponent} from "../../../document/components/document-table-component";

@Component({
    imports: [
        DocumentTableComponent
    ],
  selector: 'app-paper-component',
  styleUrl: './paper-component.scss',
  templateUrl: './paper-component.html',
})
export class PaperComponent {}
