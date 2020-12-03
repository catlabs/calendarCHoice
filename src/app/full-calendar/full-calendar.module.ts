import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarRoutingModule } from './full-calendar-routing.module';
import { FullCalendarComponent } from './full-calendar.component';


@NgModule({
  declarations: [FullCalendarComponent],
  imports: [
    CommonModule,
    FullCalendarRoutingModule
  ]
})
export class FullCalendarModule { }
