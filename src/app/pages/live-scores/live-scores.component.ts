import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService, Match } from '../../services/stats.service';

@Component({
  selector: 'app-live-scores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-scores.component.html',
})
export class LiveScoresComponent implements OnInit {
  originalMatches: Match[] = [];
  matches:         Match[] = [];

  leagues = ['All Leagues','Premier League','La Liga','Bundesliga'];
  selectedLeague = this.leagues[0];

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.getMatches().subscribe(data => {
      this.originalMatches = data;
      this.filterMatches();
    });
  }

  onLeagueChange(selected: string) {
    this.selectedLeague = selected;
    this.filterMatches();
  }

  private filterMatches() {
    if (this.selectedLeague === 'All Leagues') {
      this.matches = [...this.originalMatches];
    } else {
      this.matches = this.originalMatches.filter(
        m => m.league === this.selectedLeague
      );
    }
  }
}
