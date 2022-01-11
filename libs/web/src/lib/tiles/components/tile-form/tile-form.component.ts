import { MaxSizeValidator } from '@angular-material-components/file-input';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { CreateTileDto, Tile } from '@majesdash/data';

@Component({
  selector: 'majesdash-tile-form',
  templateUrl: './tile-form.component.html',
  styleUrls: ['./tile-form.component.scss'],
})
export class TileFormComponent implements OnInit, AfterViewInit {
  @Output() tileAddEvent = new EventEmitter<Partial<CreateTileDto>>();
  @Output() tileUpdateEvent = new EventEmitter<Partial<Tile>>();
  @Input() public tile?: Tile | null;
  @ViewChild('tileNameInput') tileNameInputField!: ElementRef;

  public color: ThemePalette = 'primary';

  constructor(public window: Window) {}

  createTileForm = new FormGroup({
    name: new FormControl(this.tile?.title ?? '', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    type: new FormControl(this.tile?.type ?? '', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    url: new FormControl(this.tile?.url ?? '', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    color: new FormControl(this.tile?.color ?? ''),
    icon: new FormControl(undefined, {
      validators: [MaxSizeValidator(16 * 1024)],
    }),
    settings: new FormControl(this.tile?.config ?? {}),
  });

  ngOnInit(): void {
    this.createTileForm.setValue({
      name: this.tile?.title ?? '',
      type: this.tile?.type ?? '',
      url: this.tile?.url ?? '',
      color: this.tile?.color ?? '',
      icon: this.tile?.icon ?? '',
      settings: this.tile?.config ?? {},
    });
  }

  ngAfterViewInit() {
    this.tileNameInputField.nativeElement.focus();
  }

  @HostListener('document:keydown.enter') addTile() {
    this.tileAddEvent.emit({
      title: this.createTileForm.value.name,
      type: this.createTileForm.value.type,
      url: this.createTileForm.value.url,
      color: this.createTileForm.value.color.hex,
      icon: this.createTileForm.value.icon,
      config: this.createTileForm.value.settings,
      tags: [],
    });
  }

  updateTile() {
    this.tileUpdateEvent.emit({
      id: this.tile?.id,
      title: this.createTileForm.value.name,
      type: this.createTileForm.value.type,
      url: this.createTileForm.value.url,
      color: this.createTileForm.value.color.hex,
      icon: this.createTileForm.value.icon,
      config: this.createTileForm.value.settings,
      tags: [],
    });
  }
}
