import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TagChip} from '../../../core/models/tag-chip.model';
import {Tag} from '../../../core/models/tag.model';

@Component({
  imports: [],
  selector: 'app-tag-chip-component',
  styleUrl: './tag-chip-component.scss',
  templateUrl: './tag-chip-component.html',
})
export class TagChipComponent implements OnChanges {
  @Input() tag: Tag = new Tag(0, 'none', 'black');
  tagChip: TagChip = new TagChip();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tag'] != undefined) {
      const {tagName, tagColor} = changes['tag'].currentValue as Tag;
      this.tagChip.title = tagName;
      this.tagChip.color = tagColor;
    }
  }
}
