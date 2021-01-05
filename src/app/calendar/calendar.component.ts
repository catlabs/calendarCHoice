import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarService } from './calendar.service';
import { EventDetailsDialogComponent } from './event-details-dialog/event-details-dialog.component';
import { CalendarFilters } from './calendar.model';
import { faCalendarAlt as farCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faAddressBook, faCalendarAlt, faColumns, faComments, faHistory, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentEvents: EventApi[] = [];
  faAddressBook = faAddressBook;
  faCalendarAlt = faCalendarAlt;
  faColumns = faColumns;
  faCommentAlt = faComments;
  faHistory = faHistory;
  faUsers = faUsers;
  farCalendarAlt = farCalendarAlt;

  eventGuid = 0;
  filtersForm: FormGroup;

  @ViewChild('calendar')
  fullCalendar!: FullCalendarComponent;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    public service: CalendarService
  ) {

    this.filtersForm = this.fb.group({
      communities: this.fb.array([])
    });

    this.service.communityOptions.forEach(() => (this.filtersForm.controls.communities as FormArray).push(new FormControl(true)));
  }

  ngOnInit(): void {
    this.filtersForm.valueChanges.subscribe((value: CalendarFilters) => {
      this.fullCalendar.getApi().refetchEvents();
    });
  }

  calendarOptions: CalendarOptions = {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    contentHeight: 700,
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
    // events: '../assets/json/events.json',
    // events: eventsJson,
    events: (info, successCallback, failureCallback) => {
      successCallback(
        this.service.getEvents(this.filtersForm.value)
      )
    },
    firstDay: 1, /* sets Monday as 1st day of the week */
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true, /* adds more events tooltip */
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
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

  openChanged(isOpen: boolean){
    this.fullCalendar.getApi().refetchEvents();
  }
}
