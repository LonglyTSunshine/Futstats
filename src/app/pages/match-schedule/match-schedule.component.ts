import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-schedule',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './match-schedule.component.html',
  styleUrls: ['./match-schedule.component.css']
})
export class MatchScheduleComponent {
  upcomingMatches = [
    { time: '2024-05-10 14:00', teams: 'Arsenal vs Man City', league: 'Premier League', location: 'Emirates Stadium' },
    { time: '2024-05-11 16:30', teams: 'Barcelona vs Atletico', league: 'La Liga', location: 'Camp Nou' },
    { time: '2024-05-12 18:00', teams: 'PSG vs Marseille', league: 'Ligue 1', location: 'Parc des Princes' }
  ];
}
