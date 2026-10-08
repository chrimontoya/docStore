import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Color} from '../../../core/models/color.model';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  imports: [
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  selector: 'app-color-picker-component',
  styleUrl: './color-picker-component.scss',
  templateUrl: './color-picker-component.html',
})
export class ColorPickerComponent implements OnChanges {
  @Input() colors: Color[] = [];
  @Input() disabled: boolean = false;
  @Output() colorChange: EventEmitter<Color> = new EventEmitter();
  colorSelected: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['colors'] != undefined){
      const [first] = changes['colors'].currentValue as Color[];
      if (!this.colorSelected){
        this.colorSelected = first.color;
        this.colorChange.emit(first);
      }
    }
  }

  onChangeColor(color: Color){
    this.colorSelected = color.color;
    this.colorChange.emit(color);
  }


}
