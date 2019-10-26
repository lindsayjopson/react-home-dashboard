import { CalendarParser } from './parser';

const testFile = `BEGIN:VCALENDAR
VERSION:2.0
X-WR-CALNAME:ramp-up
PRODID:-//Rob Rohan//Emacs with Org mode//EN
X-WR-TIMEZONE:AEDT
X-WR-CALDESC:ramp-up
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTAMP:20180120T021231Z
UID:TS1-8879A068-CE13-4DD3-B7FE-4890126284A8
DTSTART;VALUE=DATE:20171218
DTEND;VALUE=DATE:20171219
SUMMARY:🛌Rest
DESCRIPTION:<2017-12-18>
CATEGORIES:ramp-up
END:VEVENT
BEGIN:VEVENT
DTSTAMP:20180120T021231Z
UID:TS1-E49D17F9-9D70-4EAA-A92D-B65FEB586BFF
DTSTART;VALUE=DATE:20180102
DTEND;VALUE=DATE:20180103
SUMMARY:🏃🤙🏻Easy Run
DESCRIPTION:<2017-12-19> 4.5km
CATEGORIES:ramp-up
END:VEVENT
END:VCALENDAR
`;

const testFile2 = `BEGIN:VCALENDAR
VERSION:2.0
X-WR-CALNAME:strength_notes
PRODID:-//Rob Rohan//Emacs with Org mode//EN
X-WR-TIMEZONE:AEDT
X-WR-CALDESC:strength_notes
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTAMP:20180129T094644Z
UID:TS1-9EF387CF-1032-4BDB-BAB2-245A86B2B865
DTSTART;VALUE=DATE:20180102
DTEND;VALUE=DATE:20180103
SUMMARY:🏋 Strength
DESCRIPTION:<2018-01-02>\n⁃ (Chest\, shoulders\, back\, biceps\, triceps\, 
 abs\, legs\, calves)\n⁃ Back - Seated cable rows\n⁃ Biceps - Standing barb
 ell curls\n⁃ Chest - Dumbbell presses\n⁃ Triceps - Pushdowns\n⁃ Shoulders 
 - Upright rows\n⁃ Calves - Standing calf raises\n⁃ Legs - Leg presses\n⁃ A
 bs - Crunches?
CATEGORIES:strength_notes
END:VEVENT
BEGIN:VEVENT
DTSTAMP:20180129T094644Z
UID:TS1-D9D262F5-E0CB-4711-A99C-1B3F5819DFB4
DTSTART;VALUE=DATE:20180104
DTEND;VALUE=DATE:20180105
SUMMARY:🏋 Strength
DESCRIPTION:<2018-01-04>\n⁃ (Legs\, calves\, back\, abs\, shoulders\, chest
 \, biceps\, triceps)\n⁃ Back - Seated cable rows\n⁃ Biceps - Standing barb
 ell curls\n⁃ Chest - Dumbbell presses\n⁃ Triceps - Pushdowns\n⁃ Shoulders 
 - Upright rows\n⁃ Calves - Standing calf raises\n⁃ Legs - Leg presses\n⁃ A
 bs - Crunches?
CATEGORIES:strength_notes
END:VEVENT
END:VCALENDAR
`;

describe('ICalendar Parser', () => {

  it('should parse an ical file into a struct', () => {
    const p = new CalendarParser();
    p.parse(testFile);

    expect(p.calendar).not.toBeUndefined();
    expect(p.calendar.events).not.toBeUndefined();
  });

  it('should parse an ical file into a struct 2', () => {
    const p = new CalendarParser();
    p.parse(testFile2);

    expect(p.calendar).not.toBeUndefined();
    expect(p.calendar.events).not.toBeUndefined();
  });

  it('should be able to search by ID', () => {
    const p = new CalendarParser();
    p.parse(testFile);

    const event = p.findEventsById('TS1-E49D17F9-9D70-4EAA-A92D-B65FEB586BFF');
    expect(event[0].summary).toEqual('🏃🤙🏻Easy Run');
  });

  it('should be able to search by Date', () => {
    const p = new CalendarParser();
    p.parse(testFile);

    const event = p.findEventsByDate(new Date(Date.parse('2017-12-18')));
    expect(event[0].summary).toEqual('🛌Rest');
  });

  it('should load 2 calendars and find events in both', () => {
    const p = new CalendarParser();
    p.parse(testFile);
    p.parse(testFile2);

    const events = p.findEventsByDate(new Date(Date.parse('2018-01-02')));
    expect(events.length).toEqual(2);
    expect(events[0].summary).toEqual('🏃🤙🏻Easy Run');
    expect(events[1].summary).toEqual('🏋 Strength');
  });

});
