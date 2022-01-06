import {
  MatColorFormats,
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
} from '@angular-material-components/color-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JsonEditorModule } from '../json-editor/json-editor.module';
import { MaterialModule } from '../material/material.module';
import { TileFormComponent } from './components/tile-form/tile-form.component';
import { TileCreateComponent } from './containers/tile-create/tile-create.component';
import { TileListComponent } from './containers/tile-list/tile-list.component';
import { TileComponent } from './containers/tile/tile.component';

const CUSTOM_MAT_COLOR_FORMATS: MatColorFormats = {
  display: {
    colorInput: 'hex',
  },
};

const tileRoutes: Routes = [
  {
    path: 'tiles',
    children: [
      { path: '', component: TileListComponent },
      {
        path: 'create',
        component: TileCreateComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    TileFormComponent,
    TileComponent,
    TileListComponent,
    TileCreateComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(tileRoutes),
    JsonEditorModule,
    NgxMatColorPickerModule,
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: CUSTOM_MAT_COLOR_FORMATS },
  ],
  exports: [TileComponent],
})
export class TileModule {}
