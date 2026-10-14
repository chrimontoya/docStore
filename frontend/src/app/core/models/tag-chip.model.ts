import {Tag} from './tag.model';

export class TagChip {
  title: string;
  color: string;

  constructor(title: string = '', color: string = '') {
    this.title = title;
    this.color = color;
  }
}
