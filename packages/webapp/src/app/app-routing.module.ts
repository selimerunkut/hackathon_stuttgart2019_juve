import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObenComponent } from './oben.component';
import { TripsComponent } from './trips.component';

const routes: Routes = [
  { path: '', redirectTo: 'oben', pathMatch: 'full'},
  { path: 'oben', component: ObenComponent },
  { path: 'trips', component: TripsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
