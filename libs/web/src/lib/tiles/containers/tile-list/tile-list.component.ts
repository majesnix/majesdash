import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ITag, ITile, IUser } from '@majesdash/data';
import { Observable } from 'rxjs';
import { TagService } from '../../../tag/services/tag.service';
import { UserService } from '../../../user/services/user.service';
import { TileService } from '../../services/tile.service';

@Component({
  selector: 'majesdash-tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.scss'],
})
export class TileListComponent implements AfterViewInit {
  tiles$: Observable<ITile[]> = this.tileService.tiles$;
  tags$: Observable<ITag[]> = this.tagService.tags$;
  currentUser$: Observable<IUser | undefined> = this.userService.user$;
  dataSource = new MatTableDataSource<ITile>([]);

  displayedColumns = ['title', 'type', 'url', 'icon', 'tag', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tileService: TileService,
    private tagService: TagService,
    private userService: UserService,
    public window: Window
  ) {
    this.tileService.getTiles({ admin: true });
    this.tagService.getTags();
  }

  ngAfterViewInit() {
    this.tiles$.subscribe((tiles) => {
      this.dataSource.data = tiles;
      this.dataSource.paginator = this.paginator;
    });
  }

  getTagName(id: number) {
    return this.tagService.getTagName(id);
  }

  editTile(id: number) {
    this.tileService.selectTile(id);
  }

  delete(id: number) {
    this.tileService.delete(id);
  }
}
