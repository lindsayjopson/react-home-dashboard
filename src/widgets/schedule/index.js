import React from "react";
import { Http } from './http';
import { CalendarParser } from './parser';

const formatDateLookup = (date) => {
  if (!date) return '';
  return [
    date.getFullYear(),
    ('0' + (date.getMonth() + 1)).slice(-2),
    ('0' + date.getDate()).slice(-2)
  ].join('');
};

const parseCalendars = (calendars) => {
  return new Promise( (resolve, reject) => {
    const parser = new CalendarParser();
    const http = new Http();

    try {
      const allPromise = calendars.map(cal => http.xhr(cal));
      Promise.all(allPromise).then( result => {
        result.forEach( r => {
          parser.parse(r);
        });
        resolve(parser);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export class ScheduleWidget extends React.Component {
  constructor(props) {
    super(props);
    this.cals = props.cals;
    this.state = {
      eventStore: {},
      table: [],
    };
    this.squareRef = React.createRef()
  }

  componentDidMount() {
    parseCalendars(this.cals).then(cals => {
      cals.calendar.events.forEach( event => {
        const dateKey = formatDateLookup(event.date);
        if(!this.state.eventStore[dateKey]) {
          this.state.eventStore[dateKey] = [];
        }
        let events = this.state.eventStore[dateKey];
        events.push(event);
        this.state.eventStore[dateKey] = events;
  
        // this.setState({ value: this.textInput.current.value})
        const node = this.squareRef.current.querySelector('#D' + dateKey + " > div");
        const txt = events.map(d => `<p class='dash'>${d.summary}<br/>${d.description}</p>`);
        if(node) {
          node.innerHTML = txt.join('');
        }
      });
    });
  }

  createCalendar(startDate, iterateDate) {
    const today = formatDateLookup(new Date());

    for (let i = 0; i < 371; i++) {
      if (startDate.getFullYear() !== iterateDate.getFullYear()) {
        break;
      }

      const level = 0;
      if (iterateDate.getDay() !== (i % 7)) {
        this.state.table.push(<li data-level="-1" key={"D"+Math.random()}>&nbsp;</li>)
      } else {
        // Hook for us to set any events on the calendar
        const date = formatDateLookup(iterateDate);
        this.state.table.push(
          <li id={"D"+date} key={"D"+date}
            className={(today === date) ? 'today' : ''}
            data-level={level}
            data-pos={(i % 7) + "-" + (Math.max(0, i - 181) > 0 ? 1 : 0)}
            title={iterateDate.toDateString()}><div></div>
          </li>
        );
        iterateDate.setDate(iterateDate.getDate() + 1);
      }
    }
  }

  render() {
    const year = 2019;
    const startDate = new Date(year, 0, 1);
    const iterateDate = new Date();
    iterateDate.setTime(startDate.getTime());
    this.createCalendar(startDate, iterateDate)

    console.log(this.state.table);

    return (
      <div className="widget rohan-schedule">
        <div className="graph">
          <ul className="months">
            <li><span>Jan</span></li>
            <li><span>Feb</span></li>
            <li><span>Mar</span></li>
            <li><span>Apr</span></li>
            <li><span>May</span></li>
            <li><span>Jun</span></li>
            <li><span>Jul</span></li>
            <li><span>Aug</span></li>
            <li><span>Sep</span></li>
            <li><span>Oct</span></li>
            <li><span>Nov</span></li>
            <li><span>Dec</span></li>
          </ul>
          <ul className="days">
            <li><span>Sun</span></li>
            <li><span>Mon</span></li>
            <li><span>Tue</span></li>
            <li><span>Wed</span></li>
            <li><span>Thu</span></li>
            <li><span>Fri</span></li>
            <li><span>Sat</span></li>
          </ul>
          <ul className="squares" ref={this.squareRef}>{this.state.table}</ul>
        </div>
      </div>
    );
  }
}
