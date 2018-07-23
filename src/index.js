import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/** Implementation with local/private state management for Square
 * 
class Square extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button 
                className="square" 
                onClick={() => this.setState({ value: 'X' })}
            >
                {this.state.value}
            </button>
        )
    }
}
*/

/** Implementation with shared state management for 'Square' in the parent 'Board' class 
 * Square component has now become *Controlled Component*
 * 
class Square extends React.Component {
    render() {
        return (
            <button 
                className = "square" 
                onClick = { () => 
                    this.props.onClick() 
                }
            >
                {this.props.value}
            </button>
        );
    }
}
*/

/**
 * Functional components are less tedious to write than classes, and many components can be expressed this way.
 * We have changed this.props to props.
 */
function Square(props) {
    return (
        <button 
            className = "square" 
            //In a class, we used an arrow function to access the correct this value, but in a functional component we don’t need to worry about this.
            onClick = { props.onClick }
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    renderSquare(i) {
        return (
            <Square 
                value = { this.state.squares[i] }
                onClick = { () => this.handleClick(i) }
            />
        );
    }

    handleClick(i) {
        //.slice() - create a copy of the squares array to modify instead of modifying the existing array
        const squares = this.state.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({ 
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {

        const winner = calculateWinner(this.state.squares);

        let status;
        if (winner) {
            status = 'Winner ' + winner;
        } else {
            status = "Next player:" + (this.state.xIsNext ? 'X' : 'O');
        } 
        
        return (
            <div>
                <div className="status">{status}</div>
                <div className="border-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="border-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="border-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <div>{/* TODO */}</div>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] 
            && squares[a] === squares[b]
            && squares[a] === squares[c]) {
                return squares[a];
        }
    }
    return null;
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);