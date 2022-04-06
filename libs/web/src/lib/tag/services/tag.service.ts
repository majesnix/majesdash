import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ITag } from '@majesdash/data';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private tagsSubject$ = new BehaviorSubject<ITag[]>([]);
  readonly tags$ = this.tagsSubject$.asObservable();

  private selectedTagSubject$ = new BehaviorSubject<ITag | undefined>(
    undefined
  );
  readonly selectedTag$ = this.selectedTagSubject$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private window: Window,
    private router: Router
  ) {}

  getTags() {
    return this.httpClient
      .get<ITag[]>(`${this.window.location.origin}/api/tags`)
      .pipe(
        tap((tags) => {
          this.tagsSubject$.next(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            tags.sort(({ order: a }, { order: b }) => a! - b!)
          );
        })
      )
      .subscribe();
  }

  selectTag(id: number) {
    this.selectedTagSubject$.next(
      this.tagsSubject$.value.find((tag) => tag.id === id)
    );
    this.router.navigate(['/tags/create']);
  }

  deselectTag() {
    this.selectedTagSubject$.next(undefined);
  }

  addTag(tag: Omit<ITag, 'id'>) {
    const formData = new FormData();

    formData.append('name', tag.name);
    tag.icon && formData.append('icon', tag.icon);
    tag.color && formData.append('color', tag.color);

    return this.httpClient
      .post<ITag>(`${this.window.location.origin}/api/tags`, formData)
      .subscribe((tag) => {
        this.tagsSubject$.next(
          [...this.tagsSubject$.value, tag].sort(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ({ order: a }, { order: b }) => a! - b!
          )
        );
        this.router.navigate(['/']);
      });
  }

  updateTag(tag: ITag) {
    const formData = new FormData();

    formData.append('name', tag.name);
    tag.icon && formData.append('icon', tag.icon);
    tag.color && formData.append('color', tag.color);
    tag.order && formData.append('order', tag.order.toString());

    return this.httpClient
      .put<ITag>(`${this.window.location.origin}/api/tags/${tag.id}`, formData)
      .subscribe((tag) => {
        const index = this.tagsSubject$.value.findIndex((t) => t.id === tag.id);
        this.tagsSubject$.value.splice(index, 1, tag);
        this.selectedTagSubject$.next(undefined);
        this.router.navigate(['/']);
      });
  }

  moveTag(oldIndex: number, newIndex: number) {
    const tags = this.tagsSubject$.value;

    const tag = this.tagsSubject$.value[oldIndex];
    tag.order = newIndex;

    tags.splice(oldIndex, 1);
    tags.splice(newIndex, 0, tag);

    this.tagsSubject$.next([...tags]);

    this.updateTag(tag);
  }

  delete(id: number) {
    return this.httpClient
      .delete(`${this.window.location.origin}/api/tags/${id}`)
      .subscribe(() => {
        this.tagsSubject$.next(
          this.tagsSubject$.value.filter((tag) => tag.id !== id)
        );
      });
  }

  clear() {
    this.tagsSubject$.next([]);
  }
}
