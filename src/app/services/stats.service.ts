import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Match {
  time: string;
  teams: string;
  score: string;
  status: 'Finished' | 'Live' | 'Upcoming';
  league: string;
}

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private firestore: Firestore = inject(Firestore);  

  getMatches(): Observable<Match[]> {
    const matchesRef = collection(this.firestore, 'matches');
    return collectionData(matchesRef, { idField: 'id' }) as Observable<Match[]>;
  }

  addMatch(match: Match) {
    const matchesRef = collection(this.firestore, 'matches');
    return addDoc(matchesRef, match);
  }



  
}
