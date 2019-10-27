import React from "react";
import { Http } from "../../common/http";

const get_coin = (coin, currency) => {
  const http = new Http();
  const request_url = `https://api.coinpaprika.com/v1/tickers/${coin}?quotes=${currency}`;

  return http.fetch(request_url).then(v => {
    if(typeof v === 'string') v = JSON.parse(v);
    return v;
  });
};

const compute_portfolio = (holdings, currency) => {
  return new Promise((resolve, reject) => {
    let coins = {};
    let total_coins = Object.keys(holdings.crypto.coins).length;
    let total_portfolio_value = 0;
    for (let coin in holdings.crypto.coins) {
      get_coin(coin, currency)
        .then(coin_data => {
          coins[coin_data.symbol] = coin_data;
          
          const price = parseFloat(coin_data.quotes[currency].price || 0);

          let coin_value = price * holdings.crypto.coins[coin];
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

  async componentDidMount() {
    const ns = this.props.store.getState().dashboard.widgets.investments;
    const http = new Http();
    let holdings = await http.fetch(ns.holdings).then(v => {
      if(typeof v === 'string') v = JSON.parse(v);
      return v;
    });

    compute_portfolio(holdings, ns.currency)
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
