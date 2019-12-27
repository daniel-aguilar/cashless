import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent {
  joinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService) {

    this.joinForm = this.fb.group({
      pin: '',
    });
  }

  joinGame() {
    const pin = this.joinForm.value.pin as string;

    this.auth.joinGame(pin).subscribe({
      complete: () => this.router.navigate(['/account'])
    });
  }
}
