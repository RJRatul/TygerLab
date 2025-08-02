import { Component } from '@angular/core';
import { SelectGame } from './components/select-game/select-game';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SelectGame],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {}
