import { Component, inject } from '@angular/core';
import { Loading } from './loading';

import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css',
  imports: [ MatProgressSpinnerModule ],
})
export class LoadingSpinner {
  private loading = inject(Loading);

  isLoading = toSignal(this.loading.isLoading);
}
