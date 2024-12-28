import { Component, OnInit, inject } from '@angular/core';
import { LoadingService } from './loading.service';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [ MatProgressSpinnerModule ],
})
export class LoadingComponent implements OnInit {
  isLoading = false;

  private loading = inject(LoadingService);

  ngOnInit() {
    this.loading.isLoading.subscribe(isLoading => this.isLoading = isLoading);
  }
}
