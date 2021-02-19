import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { GameService } from '../game.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
})
export class NewGameComponent {
  form: FormGroup;

  get name() {
    return this.form.get('name');
  }

  constructor(
    private fb: FormBuilder,
    private game: GameService,
    private auth: AuthService,
    private router: Router,
    private loading: LoadingService) {

    this.form = this.fb.group({
      name: ['', [Validators.required, noBankName]],
    });
  }

  createGame() {
    const name = this.form.value.name as string;
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
