import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ITag, ITile, IUserSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../settings/services/settings.service';
import { TagService } from '../../../tag/services/tag.service';
import { TileService } from '../../../tiles/services/tile.service';

@Component({
  selector: 'majesdash-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  tiles$: Observable<ITile[]> = this.tileService.tiles$;
  tags$: Observable<ITag[]> = this.tagService.tags$;
  userSettings$: Observable<IUserSettings> = this.settingsService.userSettings$;

  constructor(
    private window: Window,
    private settingsService: SettingsService,
    private tagService: TagService,
    private tileService: TileService,
    private location: Location
  ) {
    this.tileService.clear();
    this.tagService.clear();

    if (window.location.hash !== '#/') {
      this.tileService.getTiles({
        tag: window.location.hash.split('/')[2],
      });
    } else {
      this.tileService.getTiles();
      this.tagService.getTags();
    }
  }

  @HostListener('document:keyup.backspace') navigateBack() {
    if (window.location.hash.includes('tags')) {
      this.location.back();
    }
  }
}
