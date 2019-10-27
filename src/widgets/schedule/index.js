import React from "react";
import { Http } from '../../common/http';
import { CalendarParser } from '../../common/icalparser';

import { formatDateLookup, formatDateDisplay } from '../../common/dates';

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
        const evtStore = this.state.eventStore;
        if(!evtStore[dateKey]) evtStore[dateKey] = [];

        let events = evtStore[dateKey];
        events.push(event);
        evtStore[dateKey] = events;

        const node = this.squareRef.current.querySelector('#D' + dateKey + " > div");
        const txt = events.map(d => `<p class='dash'>${d.summary}<br/>${d.description}</p>`);
        if(node) {
          node.innerHTML = txt.join('');
        }
      });

      const today = formatDateLookup(new Date());
      const msg = {
        type: 'SCHEDULE_SELECT_DAY',
        payload: this.state.eventStore[today] || [{
          date: new Date(),
          summary: "No Events"
        }]
      };
      this.props.store.dispatch(msg);
    });
  }

  onTouchHandler(store) {
    return (e) => {
      const id = e.currentTarget.id.toString().replace('D','');
      const date = e.currentTarget.getAttribute('data-date').toString();
      if(id) {
        const events = this.state.eventStore[id];
        if(events) {
          store.dispatch({
            type: 'SCHEDULE_SELECT_DAY',
            payload: events
          });
        } else {
          store.dispatch({
            type: 'SCHEDULE_SELECT_DAY',
            payload: [{
              date: new Date(date),
              summary: "No Events"
            }]
          });
        }
      }
    }
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
            data-date={iterateDate.toUTCString()}
            title={iterateDate.toDateString()}
            onClick={this.onTouchHandler(this.props.store)}><div></div>
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

//////////////////////////////////////////////////////////////////////////////////////

export class ScheduleDayWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: [] };
    this.sub = this.props.store.subscribe(state => {
      if(state) {
        this.setState({ text: state.schedule.day });
      }
    })
  }

  componentWillUnmount() {
    // un this.sub
  }

  render() {
    return (
      <div className="widget schedule-day">
        <div className="heading"><span>{
          this.state.text &&
          this.state.text.length &&
          formatDateDisplay(this.state.text[0].date)
        }</span></div>
        <div>{
          this.state.text &&
          this.state.text.length &&
          this.state.text.map(e => <p key={Math.random()}>{e.summary}</p>)
        }</div>
      </div>
    );
  }
}