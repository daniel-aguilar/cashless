import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Loading {
  private loading = new BehaviorSubject(false);

  get isLoading() {
    return this.loading.asObservable();
  }

  show() {
    this.loading.next(true);
    document.body.classList.add('loading-backdrop');
  }

  hide() {
    this.loading.next(false);
    document.body.classList.remove('loading-backdrop');
  }
}
