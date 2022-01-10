import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTileDto, Tile } from '@majesdash/data';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TileService {
  private tilesSubject$ = new BehaviorSubject<Tile[]>([]);
  readonly tiles$ = this.tilesSubject$.asObservable();

  constructor(private httpClient: HttpClient, private window: Window) {}

  getTiles() {
    return this.httpClient
      .get<{ tiles: Tile[] }>(`${this.window.location.origin}/api/tiles`)
      .pipe(
        tap(({ tiles }) => {
          this.tilesSubject$.next(tiles);
        })
      )
      .subscribe();
  }

  addTile(tile: Partial<CreateTileDto>) {
    const formData = new FormData();
    if (tile.icon) {
      formData.append('icon', tile.icon);
      delete tile.icon;
    }
    formData.append('tile', JSON.stringify(tile));
    return this.httpClient
      .post<{ tile: Tile }>(
        `${this.window.location.origin}/api/tiles`,
        formData
      )
      .subscribe();
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
