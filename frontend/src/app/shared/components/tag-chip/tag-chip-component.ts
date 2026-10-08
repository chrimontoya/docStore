import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TagChip} from '../../../core/models/tag-chip.model';
import {Tag} from '../../../core/models/tag.model';
import {TAG_COLORS} from '../../../core/constants/tag-colors.const';
import {Color} from '../../../core/models/color.model';

@Component({
  imports: [],
  selector: 'app-tag-chip-component',
  styleUrl: './tag-chip-component.scss',
  templateUrl: './tag-chip-component.html',
})
export class TagChipComponent implements OnChanges {
  @Input() tag: Tag = new Tag(0, 'none', 0);
  tagChip: TagChip = new TagChip();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tag'] != undefined) {
      const {tagName, tagColor} = changes['tag'].currentValue as Tag;
      this.tagChip.title = tagName;
      this.tagChip.color = this.colorById(tagColor).color;
    }
  }

  colorById(colorId: number): Color {
    return TAG_COLORS.find((color) => color.id == colorId) as Color;
  }
}
