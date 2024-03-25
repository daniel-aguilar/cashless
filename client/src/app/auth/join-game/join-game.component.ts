import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gateway } from '../gateway';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent extends Gateway implements OnInit {
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
