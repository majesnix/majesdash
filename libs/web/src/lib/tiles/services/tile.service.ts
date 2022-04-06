import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IGetTileParams, ITile } from '@majesdash/data';
import { BehaviorSubject, tap } from 'rxjs';

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

  constructor(
    private httpClient: HttpClient,
    private window: Window,
    private router: Router
  ) {}

  getTiles({ tag, admin }: IGetTileParams = {}) {
    const queryParamters = tag ? `?tag=${tag}` : ``;
    const path = admin ? '/api/tiles/all' : `/api/tiles${queryParamters}`;
    return this.httpClient
      .get<ITile[]>(`${this.window.location.origin}${path}`)
      .pipe(
        tap((tiles) => {
          this.tilesSubject$.next(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            tiles?.sort(({ order: a }, { order: b }) => a! - b!) ?? []
          );
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
    tile.type && formData.append('type', tile.type);
    tile.icon && formData.append('icon', tile.icon);
    tile.color && formData.append('color', tile.color);
    tile.config && formData.append('config', tile.config);
    tile.tag && formData.append('tag', tile.tag.toString());

    return this.httpClient
      .post<ITile>(`${this.window.location.origin}/api/tiles`, formData)
      .subscribe((tile) => {
        this.tilesSubject$.next(
          [...this.tilesSubject$.value, tile].sort(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ({ order: a }, { order: b }) => a! - b!
          )
        );
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
        this.router.navigate(['/']);
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
}
