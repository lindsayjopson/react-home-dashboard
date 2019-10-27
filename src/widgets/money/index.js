import React from "react";
import { Http } from "../../common/http";

export class MoneyWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      debt: 0,
      spendable: 0,
      savings: 0
    };
  }

  componentDidMount() {
    const http = new Http();
    const ns = this.props.store.getState().dashboard.widgets.money;
    http.fetch(ns.holdings).then(v => {
      if(typeof v === 'string') {
        v = JSON.parse(v)
      }
      this.setState(v);
    });
  }

  render() {
    return (
      <div className="widget money">
        <div className="heading">Money</div>
        <div className="group">
          <div className="group-heading">Spendable</div>
          <div className="group-content">
            ${this.state.spendable.toFixed(2)}
          </div>
        </div>
        <div className="group">
          <div className="group-heading">Savings</div>
          <div className="group-content">${this.state.savings.toFixed(2)}</div>
        </div>
      </div>
    );
  }
}
