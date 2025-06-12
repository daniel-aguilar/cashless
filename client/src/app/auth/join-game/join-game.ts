import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gateway } from '../gateway';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class JoinGame extends Gateway implements OnInit {
  form: FormGroup<{ pin: FormControl<string> }>;
  error = false;

  ngOnInit() {
    this.form = new FormGroup({
      pin: new FormControl('', { validators: Validators.required }),
    });
  }

  joinGame() {
    const pin = this.form.value.pin;
    this.enterGame(pin).subscribe({
      error: () => this.displayError(),
    });
  }

  private displayError() {
    this.error = true;
    setTimeout(() => this.error = false, 3000);
  }
}
