import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ITile } from '@majesdash/data';
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

  getTiles() {
    return this.httpClient
      .get<ITile[]>(`${this.window.location.origin}/api/tiles`)
      .pipe(
        tap((tiles) => {
          this.tilesSubject$.next(tiles);
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
    formData.append('type', tile.type);
    formData.append('url', tile.url);
    tile.icon && formData.append('icon', tile.icon);
    tile.color && formData.append('color', tile.color);
    tile.config && formData.append('config', tile.config);

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
    formData.append('type', tile.type);
    formData.append('url', tile.url);
    tile.icon && formData.append('icon', tile.icon);
    tile.color && formData.append('color', tile.color);

    return this.httpClient
      .put<ITile>(
        `${this.window.location.origin}/api/tiles/${tile.id}`,
        formData
      )
      .subscribe({
        next: (tile) => {
          const index = this.tilesSubject$.value.findIndex(
            (t) => t.id === tile.id
          );
          this.tilesSubject$.value.splice(index, 1, tile);
          this.selectedTileSubject$.next(undefined);
          this.router.navigate(['/']);
        },
      });
  }

  delete(id: number) {
    return this.httpClient
      .delete(`${this.window.location.origin}/api/tiles/${id}`)
      .subscribe({
        complete: () => {
          this.tilesSubject$.next(
            this.tilesSubject$.value.filter((tile) => tile.id !== id)
          );
        },
      });
  }
}
