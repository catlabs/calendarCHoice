import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullCalendarComponent } from './full-calendar.component';

const routes: Routes = [
  { component: FullCalendarComponent, path: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullCalendarRoutingModule { }
