// src/app/pages/league-standings/league-standings.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutstatsService, Standing } from '../../services/stats.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-league-standings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './league-standings.component.html',
  styleUrls: ['./league-standings.component.css']
})
export class LeagueStandingsComponent implements OnInit {
  standings: Standing[] = [];

  constructor(private fut: FutstatsService) {}

  ngOnInit(): void {
    this.fut.getStandings()
      .pipe(
        // 只取有 team 字段的文档
        map(arr => arr.filter(s => !!s.team))
      )
      .subscribe(data => {
        this.standings = data;
      });
  }
}
