import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    initialView: 'resourceTimelineWeek',
    resources: [
      {
        id: 'a',
        title: 'Room A'
      },
      {
        id: 'b',
        title: 'Room B'
      }
    ],
    events: [
      {
        id: '1',
        resourceId: 'a',
        title: 'Meeting',
        start: '2020-12-14'
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
