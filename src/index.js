import * as React from "react";
import { render } from "react-dom";

import { MoneyWidget } from "./widgets/money";
import { InvestmentWidget } from "./widgets/investments";

import background from "./assets/background.jpeg";
import { SoundcloudWidget } from "./widgets/soundcloud";
import { WeatherWidget } from "./widgets/weather";
import { CalendarWidget } from "./widgets/calendar";
import { CountdownWidget } from "./widgets/countdown";
import { DateTimeWidget } from "./widgets/datetime";
import { SpendingWidget } from "./widgets/spending";

const App = () => (
  <>
    <img className="background" src={background} />
    <DateTimeWidget />
    <div className="row">
      <div className="column">
        <WeatherWidget />
      </div>
      <div className="column">
        <MoneyWidget />
        <InvestmentWidget />
      </div>
      <div className="column double">
        <SpendingWidget />
        <div className="column double">
          <CountdownWidget />
          <SoundcloudWidget />
        </div>
      </div>
      <div className="column">
        <CalendarWidget />
      </div>
    </div>
  </>
);

render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
