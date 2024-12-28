import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { GameService } from '../game.service';
import { LoadingService } from '../loading/loading.service';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class NewGameComponent {
  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, noBankName] }),
  });

  get name() {
    return this.form.get('name');
  }

  private game = inject(GameService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private loading = inject(LoadingService);

  createGame() {
    const name = this.form.value.name;
    this.loading.show();
    this.game.newGame(name).subscribe(account => {
      this.loading.hide();
      this.auth.login(account);
      this.router.navigateByUrl('/banker');
    });
  }
}

function noBankName(control: AbstractControl): ValidationErrors | null {
  const name = control.value as string;
  return name.toLowerCase() === 'bank' ? { noBankName: true } : null;
}
