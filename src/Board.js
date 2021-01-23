import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  createBoard() {
    let board = [];
    for(let i=0; i<this.props.nrows; i++) {
      let rows = [];
      for(let j=0; j<this.props.ncols; j++) {
        rows.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(rows);
    }
    return board;
  }

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y, x+1);
    flipCell(y, x-1);
    flipCell(y+1, x);
    flipCell(y-1, x);

    // let hasWon = true;
    // for(let i=0; i<this.props.nrows; i++) {
    //   for(let j=0; j<this.props.ncols; j++) {
    //     hasWon = hasWon && (!this.state.board[i][j]);
    //   }
    // }
    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({board, hasWon});
  }

  makeBoard() {

    let tblBoard = [];
    for(let i=0; i<this.props.nrows; i++) {
      let rows = [];
      for(let j=0; j<this.props.ncols; j++) {
        let coord = `${i}-${j}`;
        rows.push(
          <Cell 
            key={coord} 
            isLit={this.state.board[i][j]} 
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        )
      }
      tblBoard.push(<tr key={i}>{rows}</tr>);
    }

    return (<table className="Board">
      <tbody>
        {tblBoard}
      </tbody>
    </table>);
  }

  render() {
    return (
      (this.state.hasWon ? 
        <div className="winner">
          <span className="neon-orange">YOU</span>
          <span className="neon-blue">WIN!</span>
        </div> : 
        <div>
          <div className='Board-title'>
            <div className='neon-orange'>Lights</div>
            <div className='neon-blue'>Out</div>
          </div>
          {this.makeBoard()}
        </div>
      )
    );
  }
}


export default Board;
