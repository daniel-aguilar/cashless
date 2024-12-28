import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';

const snackBarOpts: MatSnackBarConfig = {
  duration: 2500,
};

@NgModule({
  exports: [MatSnackBarModule],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: snackBarOpts },
  ]
})
export class SnackBarModule { }
