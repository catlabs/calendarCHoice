export interface CalendarFilters {
    communities: boolean[];
}

export interface CalendarEvent {
    id: string;
    resourceId: string;
    title: string;
    start: any;
    classNames: string[];
    extendedProps: {
        type: string;
    };
}