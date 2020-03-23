"use strict";

const C2F = c => c * 1.8 + 32;

const C2K = c => c + 273.15;

const F2C = f => (f - 32) / 1.8;

const F2K = f => F2C(f) + 273.15;

const K2C = k => k - 273.15;

const K2F = k => C2F(k - 273.15);

const convert = (t, scale, to) => {
  const temp = parseFloat(t);

  if (Number.isNaN(temp)) {
    return "";
  }

  let from;
  switch (scale) {
    case "Celsius":
      from = "C";
      break;
    case "Fahrenheit":
      from = "F";
      break;
    case "Kevin":
      from = "K";
      break;
  }

  const func = from === to ? "" : `${from}2${to}`;
  const result = func ? Math.round(window[func](temp) * 1000) / 1000 : t;

  return result.toString();
};

class TempField extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = e => this.props.handle(e.target.value);

  handleFocus = e =>
    this.props.focus(e.target.value, this.props.scale, this.props.scale);

  handleBlur = e => this.props.blur();

  handClear = e => this.props.clear();

  render() {
    const scale = this.props.scale;
    const from = this.props.from;
    const temp = this.props.temp;
    const active = this.props.active;

    return (
      <div className={"temp " + this.props.class}>
        <label>
          {scale} {from && from != scale && temp ? `from (${from})` : ""}
          <br />
          <input
            type="number"
            value={this.props.temp}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {active && temp ? <span onClick={this.handClear}>&#x2613;</span> : ""}
        </label>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: "",
      scale: "",
      from: ""
    };
  }

  handleChange = temp => this.setState({ temp });

  handleFocus = (temp, scale, from) => this.setState({ temp, scale, from });

  handleBlur = () =>
    this.state.temp ? "" : this.setState({ scale: "", from: "" });

  handleClear = () => this.setState({ temp: "" });

  render() {
    const temp = this.state.temp;
    const scale = this.state.scale;
    const from = this.state.from;
    const celsius = convert(temp, scale, "C");
    const fahrenheit = convert(temp, scale, "F");
    const kevin = convert(temp, scale, "K");

    return (
      <div>
        <h1>Temperature Convertor</h1>
        <p>(Powered by React and Babel)</p>
        <form>
          <TempField
            class="celsius"
            temp={celsius}
            scale="Celsius"
            active={scale === "Celsius"}
            from={from}
            handle={this.handleChange}
            focus={this.handleFocus}
            blur={this.handleBlur}
            clear={this.handleClear}
          />
          <TempField
            class="fahrenheit"
            temp={fahrenheit}
            scale="Fahrenheit"
            active={this.state.scale === "Fahrenheit"}
            from={this.state.from}
            handle={this.handleChange}
            focus={this.handleFocus}
            blur={this.handleBlur}
            clear={this.handleClear}
          />
          <TempField
            class="kevin"
            temp={kevin}
            scale="Kevin"
            active={this.state.scale === "Kevin"}
            from={this.state.from}
            handle={this.handleChange}
            focus={this.handleFocus}
            blur={this.handleBlur}
            clear={this.handleClear}
          />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
