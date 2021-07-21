import React, {Component} from 'react'
import Cell from './Cell'
import './Board.css'

class Board extends Component{

    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chanceLightsStartOn: 0.25
    }

    constructor(props){
        super(props);
        
        this.state = {
            hasWon: false,
            board: this.createBoard()
        };
    }

    createBoard(){
        let board = [];
        // TODO: create array-of-arrays of true/false

        for (let y = 0; y < this.props.nrows; y++) {
            let row = [];
            for (let x = 0; x < this.props.ncols; x++) {
                row.push(Math.random() < this.props.chanceLightsStartOn)
            }
            board.push(row);
        }
        return board;
    }

    flipCellsAround(coord) {
        console.log(coord)
        let { ncols, nrows } = this.props;
        let board = this.state.board;
        let [y, x] = coord.split("-").map(Number);

        function flipCell(y, x) {
            // if coord is actually on board, flip it

            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        }

        flipCell(y, x);
        flipCell(y, x-1);
        flipCell(y, x+1);
        flipCell(y-1, x);
        flipCell(y+1, x);

        let hasWon = board.every(row => row.every(cell => !cell));

        this.setState({ board, hasWon });
    }

    render(){
        if(this.state.hasWon){
            return(
            <div className='Board-Title'>
                <div className='winner'>
                    <span className='neon-orange'>YOU</span>
                    <span className='neon-blue'>WIN!!</span>
                </div>
            </div>)
        }
        // TODO: Make table board
        // TODO: if the game is won, just show a winning msg & render nothing else 

        let tblBoard = []; 
        for (let y = 0; y < this.props.nrows; y++){
            let row = [];
            for (let x = 0; x < this.props.ncols; x++){
                let coord = `${y}-${x}`;
                row.push(<Cell 
                    key={coord} 
                    isLit={this.state.board[y][x]} 
                    flipCellsAroundMe = {() => this.flipCellsAround(coord)} />)
            }
            tblBoard.push(<tr>{row}</tr>)
        }
        return(
            <div>
                <div className='Board-Title'>
                    <div className='neon-orange'>Lights</div>
                    <div className='neon-blue'>Out</div>
                </div>
                <table className='Board'>
                    <tbody>
                        {tblBoard}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Board;