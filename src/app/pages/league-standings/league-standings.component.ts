import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-league-standings',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './league-standings.component.html',
  styleUrls: ['./league-standings.component.css']
})
export class LeagueStandingsComponent {
  standings = [
    { rank: 1, team: 'Arsenal', wins: 20, draws: 5, losses: 3, points: 65 },
    { rank: 2, team: 'Man City', wins: 19, draws: 6, losses: 3, points: 63 },
    { rank: 3, team: 'Liverpool', wins: 18, draws: 7, losses: 3, points: 61 }
  ];
}
