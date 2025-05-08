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
       { name: 'Messi', goals: 10, assists: 5, appearances: 20 },
       { name: 'Ronaldo', goals: 12, assists: 6, appearances: 22 },
       { name: 'Mbappé', goals: 25, assists: 10, appearances: 30 },
  ];
}
