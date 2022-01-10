import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { CreateTileDto } from '@majesdash/data';

@Component({
  selector: 'majesdash-tile-form',
  templateUrl: './tile-form.component.html',
  styleUrls: ['./tile-form.component.scss'],
})
export class TileFormComponent {
  @Output() tileAddEvent = new EventEmitter<Partial<CreateTileDto>>();

  public color: ThemePalette = 'primary';

  createTileForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    type: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    url: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    color: new FormControl(''),
    icon: new FormControl(undefined, {
      validators: [MaxSizeValidator(16 * 1024)],
    }),
    settings: new FormControl({}),
  });

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
}
