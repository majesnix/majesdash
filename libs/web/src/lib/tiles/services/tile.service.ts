import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { IGetTileParams, ITile } from '@majesdash/data';
import { BehaviorSubject, tap } from 'rxjs';
import { TagService } from '../../tag/services/tag.service';

@Injectable({
  providedIn: 'root',
})
export class TileService {
  private tilesSubject$ = new BehaviorSubject<ITile[]>([]);
  readonly tiles$ = this.tilesSubject$.asObservable();

  private selectedTileSubject$ = new BehaviorSubject<ITile | undefined>(
    undefined
  );
  readonly selectedTile$ = this.selectedTileSubject$.asObservable();
  private tagService!: TagService;

  constructor(
    private httpClient: HttpClient,
    private window: Window,
    private router: Router,
    private injector: Injector
  ) {
    setTimeout(() => (this.tagService = injector.get(TagService)));
  }

  get tileCount() {
    return this.tilesSubject$.value.length;
  }

  getTiles({ tag, admin }: IGetTileParams = {}) {
    const queryParamters = tag ? `?tag=${tag}` : ``;
    const path = admin ? '/api/tiles/all' : `/api/tiles${queryParamters}`;
    return this.httpClient
      .get<ITile[]>(`${this.window.location.origin}${path}`)
      .pipe(
        tap((tiles) => {
          this.tilesSubject$.next(tiles ?? []);
        })
      )
      .subscribe();
  }

  selectTile(id: number) {
    this.selectedTileSubject$.next(
      this.tilesSubject$.value.find((tile) => tile.id === id)
    );
    this.router.navigate(['/tiles/create']);
  }

  deselectTile() {
    this.selectedTileSubject$.next(undefined);
  }

  addTile(tile: Omit<ITile, 'id'>) {
    const formData = new FormData();

    formData.append('title', tile.title);
    formData.append('url', tile.url);
    formData.append(
      'order',
      (this.tagService.tagCount + this.tileCount).toString()
    );
    tile.type && formData.append('type', tile.type);
    tile.icon && formData.append('icon', tile.icon);
    tile.color && formData.append('color', tile.color);
    tile.config && formData.append('config', tile.config);
    tile.tag && formData.append('tag', tile.tag.toString());

    return this.httpClient
      .post<ITile>(`${this.window.location.origin}/api/tiles`, formData)
      .subscribe((tile) => {
        this.tilesSubject$.next([...this.tilesSubject$.value, tile]);
        this.router.navigate(['/']);
      });
  }

  updateTile(tile: ITile) {
    const formData = new FormData();

    formData.append('title', tile.title);
    formData.append('url', tile.url);
    tile.type && formData.append('type', tile.type);
    tile.icon && formData.append('icon', tile.icon);
    tile.color && formData.append('color', tile.color);
    tile.order && formData.append('order', tile.order.toString());
    tile.tag && formData.append('tag', tile.tag.toString());

    return this.httpClient
      .put<ITile>(
        `${this.window.location.origin}/api/tiles/${tile.id}`,
        formData
      )
      .subscribe((tile) => {
        const index = this.tilesSubject$.value.findIndex(
          (t) => t.id === tile.id
        );
        this.tilesSubject$.value.splice(index, 1, tile);
        this.selectedTileSubject$.next(undefined);
        this.router.navigate(['/tiles']);
      });
  }

  moveTile(oldIndex: number, newIndex: number) {
    const tiles = this.tilesSubject$.value;

    const tile = this.tilesSubject$.value[oldIndex];
    tile.order = newIndex;

    tiles.splice(oldIndex, 1);
    tiles.splice(newIndex, 0, tile);

    this.tilesSubject$.next([...tiles]);

    this.updateTile(tile);
  }

  delete(id: number) {
    return this.httpClient
      .delete(`${this.window.location.origin}/api/tiles/${id}`)
      .subscribe(() => {
        this.tilesSubject$.next(
          this.tilesSubject$.value.filter((tile) => tile.id !== id)
        );
      });
  }

  clear() {
    this.tilesSubject$.next([]);
  }
}
