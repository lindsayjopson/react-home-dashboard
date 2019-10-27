import React from "react";

export class CountdownWidget extends React.Component {
  constructor(props) {
    super(props);
    const s = this.props.store.getState();
    const ns = s.dashboard.widgets.countdown;

    const then =  ns.date;
    const today = new Date();

    const count = Math.abs(Math.round((today - then) / (1000 * 60 * 60 * 24)));

    this.state = {
      title: ns.event,
      count: count
    };
  }

  componentDidMount() {
    setInterval(() => {
      const then = new Date(2019, 12, 15);
      const today = new Date();

      const count = Math.abs(
        Math.round((today - then) / (1000 * 60 * 60 * 24))
      );
      this.setState({
        count: count
      });
    }, 3600000);
  }

  render() {
    return (
      <div className="widget countdown">
        <div className="heading">{this.state.title}</div>
        <div className="count">{this.state.count}</div>
        <div className="meta">Days</div>
      </div>
    );
  }
}
