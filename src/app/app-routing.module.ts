import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveScoresComponent } from './pages/live-scores/live-scores.component';

const routes: Routes = [
  { path: '', redirectTo: 'live-scores', pathMatch: 'full' },
  { path: 'live-scores', component: LiveScoresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
