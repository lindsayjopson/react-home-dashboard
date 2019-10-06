import React from "react";

export class CalendarWidget extends React.Component {
  render() {
    return (
      <div className="widget calendar">
        <div className="heading">Calendar</div>
        <iframe
          src="https://calendar.google.com/calendar/embed?height=300&amp;wkst=2&amp;bgcolor=%23F4512E&amp;ctz=Pacific%2FAuckland&amp;src=ZnB1Z2FiNWY4dHR1bHByNGwxMGp2NDVwdjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZW4ubmV3X3plYWxhbmQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%23E67C73&amp;color=%234285F4&amp;showNav=0&amp;showTitle=0&amp;mode=AGENDA&amp;showTz=0&amp;showCalendars=0&amp;showTabs=0&amp;showPrint=0&amp;showDate=0&amp;title=Social"
          width="230"
          height="250"
        ></iframe>
      </div>
    );
  }
}
