import { NgxMatColorPickerModule } from '@angular-material-components/color-picker';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth/guards/admin.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MainViewModule } from '../main-view/main-view.module';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { TagFormComponent } from './components/tag-form/tag-form.component';
import { TagCreateComponent } from './containers/tag-create/tag-create.component';
import { TagListComponent } from './containers/tag-list/tag-list.component';
import { TagComponent } from './containers/tag/tag.component';

const tagRoutes: Routes = [
  {
    path: 'tags',
    canActivate: [AdminGuard],
    children: [
      { path: '', component: TagListComponent },
      {
        path: 'create',
        component: TagCreateComponent,
      },
      {
        path: ':id',
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    TagComponent,
    TagFormComponent,
    TagListComponent,
    TagCreateComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(tagRoutes),
    NgxMatColorPickerModule,
    PipesModule,
    NgxMatFileInputModule,
    MainViewModule,
  ],
  exports: [TagComponent],
})
export class TagModule {}
