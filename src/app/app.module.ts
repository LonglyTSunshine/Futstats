import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiveScoresComponent } from './pages/live-scores/live-scores.component';

import { PlayerStatsComponent } from './pages/player-stats/player-stats.component';
import { LeagueStandingsComponent } from './pages/league-standings/league-standings.component';
import { MatchScheduleComponent } from './pages/match-schedule/match-schedule.component';
import { PlayerComparisonComponent } from './pages/player-comparison/player-comparison.component';

@NgModule({
  declarations: [
    AppComponent,
    LiveScoresComponent,
    PlayerStatsComponent,
    LeagueStandingsComponent,
    MatchScheduleComponent,
    PlayerComparisonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
