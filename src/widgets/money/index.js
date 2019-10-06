import React from "react";
const fs = require("fs");

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
    let holdings = JSON.parse(
      fs.readFileSync("./src/widgets/money/holdings.json", "utf8")
    );
    this.setState({
      debt: holdings.debt,
      spendable: holdings.spendable,
      savings: holdings.savings
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
