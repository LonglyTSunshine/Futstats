import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-scores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-scores.component.html',
  styleUrls: ['./live-scores.component.css']
})
export class LiveScoresComponent {
  selectedLeague = 'All Leagues';

  leagues = ['All Leagues', 'Premier League', 'La Liga', 'Bundesliga'];

  liveMatches = [
    { time: '10:00 AM', teams: 'Arsenal vs Chelsea', score: '2 - 1', status: 'Finished', league: 'Premier League' },
    { time: '12:30 PM', teams: 'Man City vs Liverpool', score: '0 - 0', status: 'Live', league: 'Premier League' },
    { time: '1:00 PM', teams: 'Barcelona vs Real Madrid', score: '-', status: 'Upcoming', league: 'La Liga' },
    { time: '2:00 PM', teams: 'Dortmund vs Bayern', score: '-', status: 'Upcoming', league: 'Bundesliga' }
  ];

  displayMatches = this.liveMatches;

  onLeagueChange(value: string) {
    this.selectedLeague = value;
    if (this.selectedLeague === 'All Leagues') {
      this.displayMatches = this.liveMatches;
    } else {
      this.displayMatches = this.liveMatches.filter(match => match.league === this.selectedLeague);
    }
  }
}
