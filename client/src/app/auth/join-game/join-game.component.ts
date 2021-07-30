import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Gateway } from '../gateway';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent extends Gateway implements OnInit {
  form: FormGroup;
  error = false;

  ngOnInit() {
    this.form = this.fb.group({
      pin: ['', Validators.required],
    });
  }

  async joinGame() {
    const pin = this.form.value.pin as string;
    try {
      await this.enterGame(pin);
    }
    catch (error) {
      this.displayError();
    }
  }

  private displayError() {
    this.error = true;
    setTimeout(() => this.error = false, 3000);
  }
}
