class Clock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const m = this.props.m;
    const s = this.props.s;
    const ms = this.props.ms;
    const time = `${m}:${s}:${ms}`;
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
      ms: 0,
      status: 0,
    };
  }

  start = () => {
    this.setState({ status: 1 });
    this.timmer = setInterval(() => {
      this.setState((state) => ({ ms: state.ms + 1 }));
    }, 10);
  };

  stop = () => {
    clearInterval(this.timmer);
    this.setState({ status: 2 });
  };

  record = (time) => {
    document
      .querySelector(".records")
      .insertAdjacentHTML("beforeend", `<p>${time}</p>`);
  };

  reset = () => {
    this.setState({ ms: 0, status: 0 });
    document.querySelector(".records").innerHTML = "";
  };

  render() {
    const status = this.state.status;
    let time = this.state.ms;
    let ms = (time % 100).toString().padStart(2, "0");
    let s = (((time - ms) / 100) % 60).toString().padStart(2, "0");
    let m = ((((time - ms) / 100 - s) / 60) % 60).toString().padStart(2, "0");

    return (
      <React.Fragment>
        <Clock
          m={m}
          s={s}
          ms={ms}
          onClick={status === 1 ? this.record : () => false}
        />
        <div class="actions">
          <Button
            id={status === 0 ? "start" : status === 1 ? "stop" : "reset"}
            txt={status === 0 ? "Start" : status === 1 ? "Stop" : "Reset"}
            onClick={
              status === 0 ? this.start : status === 1 ? this.stop : this.reset
            }
          />
        </div>
        <div className="records"></div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("clock"));
