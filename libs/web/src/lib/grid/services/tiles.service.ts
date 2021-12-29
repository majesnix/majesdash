import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tile } from '@majesdash/data';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TilesService {
  private tilesSubject$ = new BehaviorSubject<Tile[]>([]);
  tiles$ = this.tilesSubject$.asObservable();

  constructor(private httpClient: HttpClient) {}

  getTiles() {
    return this.httpClient
      .get<{ tiles: Tile[] }>('http://localhost:3333/api/tiles')
      .pipe(
        tap(({ tiles }) => {
          this.tilesSubject$.next(tiles);
        })
      )
      .subscribe();
  }
}
