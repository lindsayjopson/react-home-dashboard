import React from "react";
const fs = require("fs");
const request = require("request");
const _ = require("underscore");

const get_coin = coin => {
  return new Promise((resolve, reject) => {
    const request_url = `https://api.coinpaprika.com/v1/tickers/${coin}?quotes=USD`;
    request.get(request_url, (err, resp, body) => {
      if (err) reject(err);
      let data = JSON.parse(body);
      resolve(data);
    });
  });
};

const compute_portfolio = holdings => {
  return new Promise((resolve, reject) => {
    let coins = {};
    let total_coins = Object.keys(holdings.crypto.coins).length;
    let total_portfolio_value = 0;
    for (let coin in holdings.crypto.coins) {
      get_coin(coin)
        .then(coin_data => {
          coins[coin_data.symbol] = coin_data;
          let coin_value =
            parseFloat(coin_data.quotes.NZD.price) *
            holdings.crypto.coins[coin];
          coins[coin_data.symbol].coin_value = coin_value;
          total_portfolio_value += coin_value;

          if (Object.keys(coins).length === total_coins) {
            total_portfolio_value += holdings.crypto.usd;

            let return_value = total_portfolio_value - holdings.crypto.invested;
            resolve({
              total: total_portfolio_value,
              return: return_value,
              performance: (return_value / holdings.crypto.invested) * 100
            });
          }
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

export class InvestmentWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crypto: {
        total: 0,
        performance: 0
      },
      shares: {
        total: 0,
        performance: 0
      }
    };
  }

  componentDidMount() {
    let holdings = JSON.parse(
      fs.readFileSync("./src/widgets/investments/holdings.json", "utf8")
    );

    compute_portfolio(holdings)
      .then(portfolio => {
        this.setState({
          crypto: {
            total: portfolio.total.toFixed(2),
            performance: portfolio.performance.toFixed(0)
          }
        });
      })
      .catch(error => {
        console.log(`Encountered error: `, error);
      });
    this.setState({
      shares: {
        total: holdings.shares.total.toFixed(2),
        performance: holdings.shares.performance.toFixed(0)
      }
    });
  }

  render() {
    const cryptoDirection = this.state.crypto.total > 0 ? "↑" : "↓";
    const cryptoDirectionColor =
      this.state.crypto.total > 0 ? "text--green" : "text--red";

    const sharesDirection = this.state.shares.total > 0 ? "↑" : "↓";
    const sharesDirectionColor =
      this.state.shares.total > 0 ? "text--green" : "text--red";
    return (
      <div className="widget crypto">
        <div className="heading">Investments</div>
        <div className="group">
          <div className="group-heading">Crypto</div>
          <div className="group-content">
            $
            {this.state.crypto.total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className={`direction ${cryptoDirectionColor}`}>
            {cryptoDirection} {this.state.crypto.performance}%
          </div>
        </div>
        <div className="group">
          <div className="group-heading">Shares</div>
          <div className="group-content">
            $
            {this.state.shares.total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className={`direction ${sharesDirectionColor}`}>
            {sharesDirection} {this.state.shares.performance}%
          </div>
        </div>
      </div>
    );
  }
}
