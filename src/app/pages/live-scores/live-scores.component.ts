// src/app/pages/live-scores/live-scores.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutstatsService, LiveScore } from '../../services/stats.service';

@Component({
  selector: 'app-live-scores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-scores.component.html',
  styleUrls: ['./live-scores.component.css']
})
export class LiveScoresComponent implements OnInit {
  // 用来存放从 Firestore 拉取下来的实时比分
  scores: LiveScore[] = [];

  constructor(private futstatsService: FutstatsService) {}

  ngOnInit(): void {
    // 调用 service 的 getLiveScores() 方法
    this.futstatsService.getLiveScores()
      .subscribe((data: LiveScore[]) => {
        this.scores = data;
      });
  }
}
