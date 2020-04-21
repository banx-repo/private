class Clock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const time = `${this.props.h}:${this.props.m}:${this.props.s}`;
    return <h1 onClick={(e) => this.props.onClick(time)}>{time}</h1>;
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        id={this.props.id}
        class={this.props.class}
        onClick={this.props.onClick}
      >
        {this.props.txt}
      </div>
    );
  }
}

class Record extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <p>{this.props.record}</p>;
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 0,
      status: 0,
      records: [],
    };
  }

  start = () => {
    this.setState({ status: 1 });
    this.timmer = setInterval(() => {
      this.setState((state) => ({ seconds: ++state.seconds }));
    }, 1000);
  };

  stop = () => {
    clearInterval(this.timmer);
    this.setState({ status: 2 });
  };

  record = (time) => {
    const records = this.state.records;
    records[records.length] = time;
    this.setState({ records });
  };

  reset = () => {
    this.setState({ seconds: 0, status: 0, records: [] });
  };

  render() {
    const status = this.state.status;
    let seconds = this.state.seconds;
    let s = (seconds % 60).toString().padStart(2, "0");
    seconds = (seconds - s) / 60;
    let m = (seconds % 60).toString().padStart(2, "0");
    seconds = (seconds - m) / 60;
    let h = (seconds % 24).toString().padStart(2, "0");

    const records = this.state.records.map((record, index) => (
      <Record record={`#${index + 1} ${record}`} />
    ));

    return (
      <React.Fragment>
        <Clock h={h} m={m} s={s} onClick={status === 1 ? this.record : () => false} />
        <div class="actions">
          <Button
            id={status === 0 ? "start" : status === 1 ? "stop" : "reset"}
            txt={status === 0 ? "Start" : status === 1 ? "Stop" : "Reset"}
            onClick={
              status === 0 ? this.start : status === 1 ? this.stop : this.reset
            }
          />
        </div>
        <div className="records">{records}</div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("clock"));
