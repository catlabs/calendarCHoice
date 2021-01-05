import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { events as eventsJson } from './../../assets/json/events.json';
import { CalendarEvent, CalendarFilters } from './calendar.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  communityOptions = [
    { name: 'European Council', value: 'EUCO', type: 'euco' },
    { name: 'Council', value: 'COS', type: 'cos' },
    { name: 'Coreper', value: 'COR', type: 'cor' },
    { name: 'Working Parties', value: 'GRO', type: 'gro' },
    { name: 'Eurogroup', value: 'EUROGROUP', type: 'external' },
    { name: 'EP Plenary', value: 'EP', type: 'external' }
  ];

  events = new BehaviorSubject<any>([]);
  events$: Observable<any>;

  constructor() {
    this.events$ = this.events.asObservable();
  }

  //getEvents(): Observable<any> {
  getEvents(filters: CalendarFilters): CalendarEvent[] {
    const selectedCommunities = filters.communities
      .map((checked: boolean, i: number) => checked ? this.communityOptions[i].value : null)
      .filter(v => v !== null);
    const eventToDisplay = eventsJson.filter(event => selectedCommunities.findIndex(com => event.extendedProps.type === com) !== -1);
    this.events.next(eventToDisplay);
    return eventToDisplay;
  }
}
