import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ITag, IUser } from '@majesdash/data';
import { Observable } from 'rxjs';
import { UserService } from '../../../user/services/user.service';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'majesdash-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements AfterViewInit {
  tags$: Observable<ITag[]> = this.tagService.tags$;
  currentUser$: Observable<IUser | undefined> = this.userService.user$;
  dataSource = new MatTableDataSource<ITag>([]);

  displayedColumns = ['title', 'icon', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tagService: TagService,
    private userService: UserService,
    public window: Window
  ) {
    this.tagService.getTags();
  }

  ngAfterViewInit() {
    this.tags$.subscribe((tags) => {
      this.dataSource.data = tags;
      this.dataSource.paginator = this.paginator;
    });
  }

  editTag(id: number) {
    this.tagService.selectTag(id);
  }

  delete(id: number) {
    this.tagService.delete(id);
  }
}
