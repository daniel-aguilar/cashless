import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarConfig, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

const snackBarOpts: MatSnackBarConfig = {
  duration: 2500,
  panelClass: 'custom-snack',
};

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: snackBarOpts }
  ]
})
export class MaterialModule { }
