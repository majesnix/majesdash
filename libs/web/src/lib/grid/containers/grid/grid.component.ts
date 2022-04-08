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
    if (window.location.href !== window.location.origin + '/') {
      this.tileService.getTiles({
        tag: window.location.pathname.split('/')[2],
      });
      this.tagService.clear();
    } else {
      this.tileService.getTiles();
      this.tagService.getTags();
    }
  }

  @HostListener('document:keyup.backspace') navigateBack() {
    if (window.location.href.includes('tags')) {
      this.location.back();
    }
  }

  drop(event: any) {
    //event.stopPropagation();
    console.log('DROP', event);
    this.tileService.moveTile(event.previousIndex, event.currentIndex);
  }

  disableClick() {
    console.log('START');
  }
}
