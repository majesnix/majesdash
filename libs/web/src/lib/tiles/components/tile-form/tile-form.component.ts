import { MaxSizeValidator } from '@angular-material-components/file-input';
import {
AfterViewInit,
ChangeDetectorRef,
Component,
ElementRef,
EventEmitter,
HostListener,
Input,
OnInit,
Output,
ViewChild
} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { CreateTileDto,Tile } from '@majesdash/data';

@Component({
  selector: 'majesdash-tile-form',
  templateUrl: './tile-form.component.html',
  styleUrls: ['./tile-form.component.scss'],
})
export class TileFormComponent implements OnInit, AfterViewInit {
  @Output() tileAddEvent = new EventEmitter<Partial<CreateTileDto>>();
  @Output() tileUpdateEvent = new EventEmitter<Partial<Tile>>();
  @Input() public tile?: Tile | null;
  @ViewChild('tileName') tileNameInputField!: ElementRef;

  public color: ThemePalette = 'primary';
  createTileForm: FormGroup;

  constructor(
    public window: Window,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.createTileForm = this.fb.group({
      name: [this.tile?.title ?? '', [Validators.required]],
      type: [this.tile?.type ?? '', [Validators.required]],
      url: [this.tile?.url ?? '', [Validators.required]],
      color: [this.tile?.color ?? ''],
      icon: [undefined, [MaxSizeValidator(16 * 2 ** 20)]],
      settings: [this.tile?.config ?? {}],
    });
  }

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
    this.cdRef.detectChanges();
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
