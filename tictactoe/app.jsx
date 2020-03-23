"use strict";

function check(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

class Square extends React.Component {
  render() {
    return (
      <button
        className={"square"}
        onClick={this.props.end ? null : this.props.handleClick}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  square(i) {
    return (
      <Square
        end={this.props.end}
        value={this.props.board[i]}
        handleClick={e => this.props.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="status">{this.props.status}</div>
        <div className={"board-row"}>
          {this.square(0)}
          {this.square(1)}
          {this.square(2)}
        </div>
        <div className={"board-row"}>
          {this.square(3)}
          {this.square(4)}
          {this.square(5)}
        </div>
        <div className={"board-row"}>
          {this.square(6)}
          {this.square(7)}
          {this.square(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ board: Array(9).fill(null) }],
      end: false,
      next: "X",
      step: 0
    };
  }

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.step + 1);
    const current = history[history.length - 1];
    const board = current.board.slice();

    if (board[i]) {
      return;
    }

    board[i] = this.state.next;
    const end = check(board) ? true : false;
    const next = end ? this.state.next : this.state.next === "X" ? "O" : "X";

    this.setState({
      history: history.concat([{ board }]),
      step: history.length,
      end,
      next
    });
  };

  jump(step) {
    const history = this.state.history;
    const current = history[step];
    const board = current.board.slice();
    const end = check(board) ? true : false;
    const next = end ? this.state.next : step % 2 === 0 ? "X" : "O";
    this.setState({
      step,
      end,
      next
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.step];
    const winner = this.state.end ? this.state.next : null;
    const status = winner ? "Winner: " + winner : "Player: " + this.state.next;

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Game start";

      return (
        <li key={move}>
          <button onClick={e => this.jump(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            status={status}
            end={this.state.end}
            board={current.board}
            handleClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-log">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div id="app">
      <h1>Tic Tac Toe</h1>
      <p>(Powered by React and Babel)</p>
      <Game />
    </div>
  );
}

ReactDOM.render(<App />, document.body);
