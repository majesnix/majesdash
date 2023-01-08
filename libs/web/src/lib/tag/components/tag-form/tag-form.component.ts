import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ITag } from '@majesdash/data';
import { MaxSizeValidator } from '@majesnix/file-input';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'majesdash-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss'],
})
export class TagFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() tagAddEvent = new EventEmitter<Omit<ITag, 'id'>>();
  @Output() tagUpdateEvent = new EventEmitter<ITag>();
  @Input() public tag?: ITag | null;
  @ViewChild('tagName') tagNameInputField!: ElementRef;

  public color: ThemePalette = 'primary';
  createTagForm!: FormGroup;

  constructor(
    public window: Window,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.createTagForm = this.fb.group({
      name: [this.tag?.name ?? '', [Validators.required]],
      color: [this.tag?.color ?? ''],
      icon: [undefined, [MaxSizeValidator(16 * 2 ** 20)]],
      hidden: [this.tag?.hidden ?? false],
    });
  }

  ngAfterViewInit() {
    this.tagNameInputField.nativeElement.focus();
    this.cdRef.detectChanges();
  }

  @HostListener('document:keydown.enter') addOrUpdate() {
    if (this.tag) {
      this.updateTag();
    } else {
      this.addTag();
    }
  }

  addTag() {
    this.tagAddEvent.emit({
      name: this.createTagForm.value.name,
      color: this.createTagForm.value.color.hex,
      icon: this.createTagForm.value.icon,
      hidden: this.createTagForm.value.hidden,
    });
  }

  updateTag() {
    this.tagUpdateEvent.emit({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: this.tag!.id,
      name: this.createTagForm.value.name,
      color: this.createTagForm.value.color.hex,
      icon: this.createTagForm.value.icon,
      hidden: this.createTagForm.value.hidden,
    });
  }

  ngOnDestroy(): void {
    this.tagService.deselectTag();
  }
}
