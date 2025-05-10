import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent {
  players = [
    { name: 'Lionel Messi', goals: 17, assists: 9, appearances: 26 },
    { name: 'Cristiano Ronaldo', goals: 20, assists: 6, appearances: 27 },
    { name: 'Kylian Mbappé', goals: 19, assists: 7, appearances: 28 },
    { name: 'Erling Haaland', goals: 22, assists: 5, appearances: 28 }
  ];
}
