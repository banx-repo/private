"use strict";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  createRow = (row, col) => {
    const board = [];
    for (let i = 0; i < col; i++) {
      board.push(
        <Square
          value={this.props.board[row][i]}
          onClick={e => this.props.onClick(row, i)}
        />
      );
    }

    return <div className="row">{board}</div>;
  };

  createBoard = (row, col) => {
    const board = [];
    for (let i = 0; i < row; i++) {
      board.push(this.createRow(i, col));
    }

    return <div className="board">{board}</div>;
  };

  render() {
    const row = this.props.board.length;
    const col = this.props.board[0].length;

    return (
      <div className="app">
        <div className="info">
          <h1 className="heading">Game XO</h1>
          <p className="desc">(Powered by ReactJS)</p>
          <p className="author">Ba Nguyễn</p>
          <div className="player">Turn: {this.props.player}</div>
          <button type="reset" onClick={this.props.reset}>
            Reset
          </button>
          {this.props.winner ? (
            <div className="winner"> {this.props.winner} Win!!!</div>
          ) : (
            ""
          )}
        </div>
        {this.createBoard(row, col)}
      </div>
    );
  }
}

class GameXO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Array(20).fill(null).map(() => new Array(20).fill(null)),
      player: "X",
      length: 5,
      end: false,
      winner: ""
    };
  }

  onClick = (row, col) => {
    const board = this.state.board.slice();
    const player = this.state.player;

    if (board[row][col]) {
      return;
    }

    board[row][col] = player;
    const next = player === "X" ? "O" : "X";

    if (check(board, row, col, player)) {
      this.setState({ end: true, winner: player });
    }

    this.setState({
      board,
      player: next
    });
  };

  reset = () => {
    this.setState({
      board: new Array(20).fill(null).map(() => new Array(20).fill(null)),
      player: "X",
      length: 5,
      end: false,
      winner: ""
    });
  };

  render() {
    const board = this.state.board;
    const player = this.state.player;
    const winner = this.state.winner;

    return (
      <Board
        board={board}
        player={player}
        winner={winner}
        onClick={
          this.state.end ? () => {} : (row, col) => this.onClick(row, col)
        }
        reset={e => this.reset()}
      />
    );
  }
}

function horizontal(board, row, col, player) {
  let count = 0;
  backward: for (let i = col; i >= 0; i--) {
    if (board[row][i] === player) {
      count++;
    } else {
      break backward;
    }
  }
  forward: for (let i = col + 1; i < board[0].length; i++) {
    if (board[row][i] === player) {
      count++;
    } else {
      break forward;
    }
  }

  if (count >= 5) {
    return true;
  }
  return false;
}

function vertical(board, row, col, player) {
  let count = 0;
  up: for (let i = row; i >= 0; i--) {
    if (board[i][col] === player) {
      count++;
    } else {
      break up;
    }
  }
  down: for (let i = row + 1; i < board.length; i++) {
    if (board[i][col] === player) {
      count++;
    } else {
      break down;
    }
  }

  if (count >= 5) {
    return true;
  }
  return false;
}

function crossBackward(board, row, col, player) {
  let count = 0;
  up: for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === player) {
      count++;
    } else {
      break up;
    }
  }
  down: for (
    let i = row + 1, j = col + 1;
    i < board.length && j < board[0].length;
    i++, j++
  ) {
    if (board[i][j] === player) {
      count++;
    } else {
      break down;
    }
  }

  if (count >= 5) {
    return true;
  }
  return false;
}

function crossForward(board, row, col, player) {
  let count = 0;
  up: for (let i = row, j = col; i >= 0 && j < board[0].length; i--, j++) {
    if (board[i][j] === player) {
      count++;
    } else {
      break up;
    }
  }
  down: for (
    let i = row + 1, j = col - 1;
    i < board.length && j >= 0;
    i++, j--
  ) {
    if (board[i][j] === player) {
      count++;
    } else {
      break down;
    }
  }

  if (count >= 5) {
    return true;
  }
  return false;
}

function check(board, row, col, player) {
  if (
    horizontal(board, row, col, player) ||
    vertical(board, row, col, player) ||
    crossBackward(board, row, col, player) ||
    crossForward(board, row, col, player)
  ) {
    return true;
  }
}

function App() {
  return (
    <div id="game">
      <GameXO />
    </div>
  );
}

ReactDOM.render(<GameXO />, document.body);
