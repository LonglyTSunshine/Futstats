import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutstatsService, PlayerStat } from '../../services/stats.service';

@Component({
  selector: 'app-player-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {
  players: PlayerStat[] = [];

  constructor(private fut: FutstatsService) {}

  ngOnInit(): void {
    this.fut.getPlayerStats().subscribe(data => {
      this.players = data;
    });
  }
}
