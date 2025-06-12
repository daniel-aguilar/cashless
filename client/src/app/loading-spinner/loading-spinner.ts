import { Component, OnInit, inject } from '@angular/core';
import { Loading } from './loading';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css',
  imports: [ MatProgressSpinnerModule ],
})
export class LoadingSpinner implements OnInit {
  isLoading = false;

  private loading = inject(Loading);

  ngOnInit() {
    this.loading.isLoading.subscribe(isLoading => this.isLoading = isLoading);
  }
}
