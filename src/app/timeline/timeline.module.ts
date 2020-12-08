import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { TimelineComponent } from './timeline.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  interactionPlugin,
  resourceTimelinePlugin
]);

@NgModule({
  declarations: [TimelineComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    TimelineRoutingModule
  ]
})
export class TimelineModule { }
