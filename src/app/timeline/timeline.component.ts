import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { events as eventsJson } from './../../assets/json/events.json';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  events = new BehaviorSubject<any>([]);
  events$: Observable<any>;

  constructor() {
    this.events$ = this.events.asObservable();
  }

  ngOnInit(): void {
  }

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
    events: (info, successCallback, failureCallback) => {
      successCallback(
        this.getEvents()
      )
    }
  };

  getEvents(): EventInput[] {
    this.events.next(eventsJson);
    return this.events.value;
  }
}
