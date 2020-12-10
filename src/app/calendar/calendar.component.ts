import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { EventDetailsDialogComponent } from './event-details-dialog/event-details-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentEvents: EventApi[] = [];
  communitiesOption = [
    { name: 'COR', value: 'cor' },
    { name: 'COS', value: 'cos' },
    { name: 'GRO', value: 'gro' },
    { name: 'EUCO', value: 'euco' },
    { name: 'EXTERNAL', value: 'external' },
  ];
  eventGuid = 0;
  filtersForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {

    /* this.formBuilder.group({
      acceptTerms: [false, Validators.requiredTrue]
    }); */

    this.filtersForm = this.fb.group({
      communities: this.fb.group({
        cor: [true],
        cos: [true],
        gro: [true],
        euco: [true],
        external: [true]
      })
    });
  }

  ngOnInit(): void {
    this.filtersForm.valueChanges.subscribe(values => {
      console.log(values.communities);
    });
  }

  calendarOptions: CalendarOptions = {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    headerToolbar: {
      left: 'prev,next', /* prev,next today */
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' /* dayGridMonth,timeGridWeek,timeGridDay,listWeek,resourceTimeline,resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth */
    },
    slotLabelFormat: [{
      hour: '2-digit',
      minute: '2-digit',
      hour12: false /* sets 24h format */
    }],
    slotMinTime: '08:00:00', /* sets slot timeframe for week and day views */
    slotMaxTime: '23:00:00', /* sets slot timeframe for week and day views */
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false /* sets 24h format */
    },
    initialView: 'dayGridMonth',
    // initialEvents: '../assets/json/events.json',
    events: '../assets/json/events.json',
    firstDay: 1, /* sets Monday as 1st day of the week */
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true, /* adds more events tooltip */
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        className: 'gro',
        extendedProps: {
          type: 'GRO'
        }
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    const dialogRef = this.dialog.open(EventDetailsDialogComponent, {
      width: '500px',
      data: clickInfo
    });

    dialogRef.afterClosed().subscribe((hasToDelete: boolean) => {
      if (hasToDelete) {
        clickInfo.event.remove();
      }
    });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  createEventId() {
    return String(this.eventGuid++);
  }
}
