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
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'resourceTimelineMonth,resourceTimelineWeek,resourceTimelineDay'
    },
    slotLabelFormat: [{
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }],
    slotMinTime: '08:00:00',
    slotMaxTime: '23:00:00',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    resources: '../assets/json/resources.json',
    events: '../assets/json/events.json'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
