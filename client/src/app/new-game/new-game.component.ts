import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent {
  gameForm: FormGroup;

  constructor(
    private fb: FormBuilder) {

    this.gameForm = this.fb.group({
      playerName: ['', Validators.required],
    });
  }

  createGame() {
    console.log('TBD');
  }
}
