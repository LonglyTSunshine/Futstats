import { Routes } from '@angular/router';
import { LiveScoresComponent } from './pages/live-scores/live-scores.component';
import { PlayerStatsComponent } from './pages/player-stats/player-stats.component';
import { LeagueStandingsComponent } from './pages/league-standings/league-standings.component';
import { MatchScheduleComponent } from './pages/match-schedule/match-schedule.component';
import { PlayerComparisonComponent } from './pages/player-comparison/player-comparison.component';


export const routes: Routes = [
  { path: '', redirectTo: 'live-scores', pathMatch: 'full' },
  { path: 'live-scores', component: LiveScoresComponent },
  { path: 'player-stats', component: PlayerStatsComponent },
  { path: 'league-standings', component: LeagueStandingsComponent },
  { path: 'match-schedule', component: MatchScheduleComponent },
  { path: 'player-comparison', component: PlayerComparisonComponent },

];
