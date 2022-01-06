import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Tile } from '@majesdash/data';
import { ENVIRONMENT, Environment } from '@majesdash/environment';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TileService {
  private tilesSubject$ = new BehaviorSubject<Tile[]>([]);
  readonly tiles$ = this.tilesSubject$.asObservable();

  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT) public env: Environment
  ) {}

  getTiles() {
    return this.httpClient
      .get<{ tiles: Tile[] }>(`${this.env.base_url}/api/tiles`)
      .pipe(
        tap(({ tiles }) => {
          this.tilesSubject$.next(tiles);
        })
      )
      .subscribe();
  }

  addTile(tile: Partial<Tile>) {
    return this.httpClient
      .post<{ tile: Tile }>(`${this.env.base_url}/api/tiles`, {
        tile: { ...tile, order: 0 },
      })
      .subscribe();
  }
}
