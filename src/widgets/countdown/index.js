import React from "react";

export class CountdownWidget extends React.Component {
  constructor(props) {
    super(props);

    const then = new Date(2019, 12, 15);
    const today = new Date();

    const count = Math.abs(Math.round((today - then) / (1000 * 60 * 60 * 24)));

    this.state = {
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
        <div className="heading">Christmas Party</div>
        <div className="count">{this.state.count}</div>
        <div className="meta">Days</div>
      </div>
    );
  }
}
