import { Component, Input } from '@angular/core';
import { ITag } from '@majesdash/data';

@Component({
  selector: 'majesdash-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  @Input() target = '_blank';
  @Input() tag!: ITag;

  constructor(public window: Window) {}
}
