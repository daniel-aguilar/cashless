import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [
    CommonModule,
    MatProgressSpinner,
  ]
})
export class LoadingComponent implements OnInit {
  isLoading = false;

  constructor(private loading: LoadingService) {

  }

  ngOnInit() {
    this.loading.isLoading.subscribe(isLoading => this.isLoading = isLoading);
  }
}
