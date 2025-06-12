import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth/auth';
import { Game } from '../game';
import { Loading } from '../loading-spinner/loading';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class NewGame {
  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, noBankName] }),
  });

  get name() {
    return this.form.get('name');
  }

  private game = inject(Game);
  private auth = inject(Auth);
  private router = inject(Router);
  private loading = inject(Loading);

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
