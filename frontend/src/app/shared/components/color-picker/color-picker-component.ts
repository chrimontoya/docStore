import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Color} from '../../../core/models/color.model';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {TAG_COLORS} from '../../../core/constants/tag-colors.const';

@Component({
  imports: [
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuTrigger
  ],
  selector: 'app-color-picker-component',
  styleUrl: './color-picker-component.scss',
  templateUrl: './color-picker-component.html',
})
export class ColorPickerComponent {
  @Input() colors: Color[] = [];
  @Input() disabled: boolean = false;
  @Input() colorSelected: number = 1;
  @Output() colorChange: EventEmitter<Color> = new EventEmitter();

  get currentColor(): string {
    return this.colorById(this.colorSelected).color;
  }

  onChangeColor(color: Color) {
    this.colorSelected = color.id;
    this.colorChange.emit(color);
  }

  colorById(colorId: number): Color {
    return TAG_COLORS.find((color) => color.id == colorId) as Color;
  }


}
