import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTabsModule,
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTabsModule,
    ],
})
export class MaterialModule { }
