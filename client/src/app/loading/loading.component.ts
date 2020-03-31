import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading = false;

  constructor(private loading: LoadingService) {

  }

  ngOnInit() {
    this.loading.isLoading.subscribe(isLoading => this.isLoading = isLoading);
  }
}
