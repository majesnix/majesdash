import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { JsonEditorModule } from './json-editor/json-editor.module';
import { MainViewComponent } from './main-view/main-view.component';
import { MainViewModule } from './main-view/main-view.module';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';
import { SetupModule } from './setup/setup.module';
import { TileModule } from './tiles/tile.module';
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';

@NgModule({
  imports: [
    CommonModule,
    SettingsModule,
    AuthModule,
    LayoutModule,
    MainViewModule,
    UserModule,
    ProfileModule,
    TileModule,
    JsonEditorModule,
    SetupModule,
    WeatherModule,
    RouterModule.forRoot([], {
      scrollPositionRestoration: 'top',
      initialNavigation: 'enabledBlocking',
    }),
  ],
  declarations: [],
  exports: [MainViewComponent],
})
export class WebModule {}
