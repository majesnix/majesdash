import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export { Authenticate } from './authenticate';
export { User } from './user';
export { Settings, SettingsUpdate } from './settings';
export { TabTarget } from './tab-target';

@NgModule({
  imports: [CommonModule],
})
export class DataModelsModule {}
