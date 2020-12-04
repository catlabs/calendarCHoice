import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarRoutingModule } from './full-calendar-routing.module';
import { FullCalendarComponent } from './full-calendar.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interaction from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interaction
]);

@NgModule({
  declarations: [
    FullCalendarComponent
  ],
  imports: [
    CommonModule,
    FullCalendarRoutingModule,
    FullCalendarModule
  ]
})
export class NgFullCalendarModule { }
