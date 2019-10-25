import React from "react";

export class DateTimeWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      const d = new Date();
      let hours = d.getHours();
      let minutes = ("0" + d.getMinutes()).slice(-2);;
      hours = hours > 12 ? hours - 12 : hours;
      this.setState({
        time: `${hours}:${minutes}`
      });
    }, 1000);
  }
  render() {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return (
      <div className="widget datetime">
        <div className="time">{this.state.time}</div>
        <div className="date">{day} / {month} / {year}</div>
      </div>
    );
  }
}
