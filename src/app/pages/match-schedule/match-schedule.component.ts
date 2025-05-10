// src/app/pages/match-schedule/match-schedule.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FutstatsService, Schedule } from '../../services/stats.service';

@Component({
  selector: 'app-match-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-schedule.component.html',
  styleUrls: ['./match-schedule.component.css']
})
export class MatchScheduleComponent implements OnInit {
  // 用于存放从 Firestore 拉取的赛程数据
  schedule: Schedule[] = [];

  // 构造函数注入 service，实例名首字母小写
  constructor(private futstatsService: FutstatsService) {}

  ngOnInit(): void {
    // 订阅 Observable，并把返回的数据赋给 schedule
    this.futstatsService.getSchedules().subscribe(data => {
      this.schedule = data;
    });
  }
}
