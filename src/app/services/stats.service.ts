// src/app/services/stats.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// 根据你的 Firestore 文档字段定义接口
export interface LiveScore {
  teams: string;
  score: string;
  status: string;
  time:   string;
}
export interface Schedule {
  dateTime: string;
  teams:    string;
  league:   string;
  location: string;
}
export interface PlayerStat {
  player: string;
  goals:  number;
  assists:number;
  // … 其它字段
}
export interface Standing {
  team:    string;
  played:  number;
  won:     number;
  drawn:   number;
  lost:    number;
  points:  number;
}
export interface PlayerComparison {
  player: string;
  statA:  number;
  statB:  number;
  // … 其它字段
}

@Injectable({ providedIn: 'root' })
export class FutstatsService {
  constructor(private firestore: Firestore) {}

  // Live Scores
  getLiveScores(): Observable<LiveScore[]> {
    const coll = collection(this.firestore, 'matches');
    return collectionData(coll, { idField: 'id' }) as Observable<LiveScore[]>;
  }

  // Match Schedule
  getSchedules(): Observable<Schedule[]> {
    const coll = collection(this.firestore, 'schedules');
    const q    = query(coll, orderBy('dateTime'));
    return collectionData(q, { idField: 'id' }) as Observable<Schedule[]>;
  }

  // Player Stats
  getPlayerStats(): Observable<PlayerStat[]> {
    const coll = collection(this.firestore, 'playerStats');
    return collectionData(coll, { idField: 'id' }) as Observable<PlayerStat[]>;
  }

  // League Standings
  getStandings(): Observable<Standing[]> {
    const coll = collection(this.firestore, 'standings');
    // 如果需要按积分排序：query(coll, orderBy('points', 'desc'))
    return collectionData(coll, { idField: 'id' }) as Observable<Standing[]>;
  }

  // Player Comparison
  getPlayerComparisons(): Observable<PlayerComparison[]> {
    const coll = collection(this.firestore, 'playerComparisons');
    return collectionData(coll, { idField: 'id' }) as Observable<PlayerComparison[]>;
  }
}

