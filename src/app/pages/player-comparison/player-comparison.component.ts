import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutstatsService, PlayerComparison } from '../../services/stats.service';

@Component({
  selector: 'app-player-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-comparison.component.html',
  styleUrls: ['./player-comparison.component.css']
})
export class PlayerComparisonComponent implements OnInit {
  comparisons: PlayerComparison[] = [];
  selected1?: PlayerComparison;
  selected2?: PlayerComparison;

  constructor(private fut: FutstatsService) {}

  ngOnInit(): void {
    this.fut.getPlayerComparisons().subscribe(data => {
      this.comparisons = data;
      if (data.length >= 2) {
        this.selected1 = data[0];
        this.selected2 = data[1];
      }
    });
  }

  selectPlayer(name: string, slot: 1 | 2) {
    const p = this.comparisons.find(x => x.player === name);
    if (!p) return;
    slot === 1 ? this.selected1 = p : this.selected2 = p;
  }
}
