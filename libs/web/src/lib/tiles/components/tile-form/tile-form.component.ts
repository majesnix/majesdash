import { MaxSizeValidator } from '@angular-material-components/file-input';
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
import { ITile } from '@majesdash/data';
import { TagService } from '../../../tag/services/tag.service';
import { TileService } from '../../services/tile.service';

@Component({
  selector: 'majesdash-tile-form',
  templateUrl: './tile-form.component.html',
  styleUrls: ['./tile-form.component.scss'],
})
export class TileFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() tileAddEvent = new EventEmitter<Omit<ITile, 'id'>>();
  @Output() tileUpdateEvent = new EventEmitter<ITile>();
  @Input() public tile?: ITile | null;
  @ViewChild('tileName') tileNameInputField!: ElementRef;

  public color: ThemePalette = 'primary';
  createTileForm!: FormGroup;
  tags$ = this.tagService.tags$;

  constructor(
    public window: Window,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private tileService: TileService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.createTileForm = this.fb.group({
      name: [this.tile?.title ?? '', [Validators.required]],
      type: [this.tile?.type ?? ''],
      url: [this.tile?.url ?? '', [Validators.required]],
      color: [this.tile?.color ?? ''],
      icon: [undefined, [MaxSizeValidator(16 * 2 ** 20)]],
      settings: [this.tile?.config ?? {}],
      tag: [this.tile?.tagId ?? 0],
    });
  }

  ngAfterViewInit() {
    this.createTileForm.get('type')?.disable();
    this.createTileForm.get('settings')?.disable();
    this.tileNameInputField.nativeElement.focus();
    this.cdRef.detectChanges();
  }

  @HostListener('document:keydown.enter') addOrUpdate() {
    if (this.tile) {
      this.updateTile();
    } else {
      this.addTile();
    }
  }

  addTile() {
    this.tileAddEvent.emit({
      title: this.createTileForm.value.name,
      type: this.createTileForm.value.type,
      url: this.createTileForm.value.url,
      color: this.createTileForm.value.color.hex,
      icon: this.createTileForm.value.icon,
      tag:
        this.createTileForm.value.tag === 0
          ? undefined
          : this.createTileForm.value.tag,
    });
  }

  updateTile() {
    this.tileUpdateEvent.emit({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: this.tile!.id,
      title: this.createTileForm.value.name,
      type: this.createTileForm.value.type,
      color: this.createTileForm.value.color.hex,
      url: this.createTileForm.value.url,
      icon: this.createTileForm.value.icon,
      tag:
        this.createTileForm.value.tag === 0
          ? undefined
          : this.createTileForm.value.tag,
    });
  }

  ngOnDestroy(): void {
    this.tileService.deselectTile();
  }
}
