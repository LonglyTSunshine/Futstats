import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-comparison.component.html',
  styleUrls: ['./player-comparison.component.css']
})
export class PlayerComparisonComponent {
  players = [
    { name: 'Lionel Messi', goals: 17, assists: 9, appearances: 26 },
    { name: 'Cristiano Ronaldo', goals: 20, assists: 6, appearances: 27 },
    { name: 'Kylian Mbappé', goals: 19, assists: 7, appearances: 28 },
    { name: 'Erling Haaland', goals: 22, assists: 5, appearances: 28 }
  ];

  selectedPlayer1 = this.players[0];
  selectedPlayer2 = this.players[1];

  selectPlayer(playerName: string, selector: number) {
    const player = this.players.find(p => p.name === playerName);
    if (!player) return;

    if (selector === 1) {
      this.selectedPlayer1 = player;
    } else {
      this.selectedPlayer2 = player;
    }
  }
}
