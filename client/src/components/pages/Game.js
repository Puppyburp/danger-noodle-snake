import React, { Component } from "react";
import "./Game.css";

class Game extends Component {
  state = {
    tickTime: 200,
    horizontals: 25,
    verticals: 25,
    board: [],
    food: {},
    snake: {
      head: {},
      tail: [],
    },
    currentDirection: "right",
    die: false,
    score: 0,
    scoreFactor: 10,
  };
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  getRandomboard() {
    return {
      horizontal: Math.floor(Math.random() * this.state.horizontals),
      vertical: Math.floor(Math.random() * this.state.verticals),
    };
  }

  getCenterOfboard() {
    return {
      horizontal: Math.floor((this.state.horizontals - 1) / 2),
      vertical: Math.floor((this.state.verticals - 1) / 2),
    };
  }

  resetboard(state = {}, sendBack = false) {
    if (!Object.keys(state).length) {
      state = this.state;
    }

    const board = [];
    const { horizontals, verticals, food, snake } = state;

    for (let horizontal = 0; horizontal < horizontals; horizontal++) {
      for (let vertical = 0; vertical < verticals; vertical++) {
        const isFood =
          food.horizontal === horizontal && food.vertical === vertical;
        const isHead =
          snake.head.horizontal === horizontal &&
          snake.head.vertical === vertical;
        let isTail = false;
        snake.tail.forEach((t) => {
          if (t.horizontal === horizontal && t.vertical === vertical) {
            isTail = true;
          }
        });

        board.push({
          horizontal,
          vertical,
          isFood,
          isHead,
          isTail,
        });
      }
    }

    if (sendBack) {
      return board;
    } else {
      this.setState({
        board,
      });
    }
  }

  gameTick() {
    this.setState((state) => {
      let { currentDirection, snake, food } = state;
      let { tail } = snake;

      const { horizontal, vertical } = state.snake.head;
      let head = {
        horizontal,
        vertical,
      };

      // When game over is shown, stop the tick
      if (state.die) {
        clearInterval(window.fnInterval);
      }

      // Snake eats
      tail.unshift({
        horizontal: head.horizontal,
        vertical: head.vertical,
      });

      if (
        head.horizontal === state.food.horizontal &&
        head.vertical === state.food.vertical
      ) {
        food = this.getRandomboard();
      } else {
        tail.pop();
      }

      // Snake moves head
      switch (currentDirection) {
        case "left":
          head.vertical--;
          break;

        case "up":
          head.horizontal--;
          break;

        case "down":
          head.horizontal++;
          break;

        case "right":
        default:
          head.vertical++;
          break;
      }

      const newState = {
        ...state,
        food,
        snake: {
          head,
          tail,
        },
      };

      // In new state, check if die conditions are met
      let die = false;
      if (
        newState.snake.head.horizontal < 0 ||
        newState.snake.head.horizontal >= this.state.horizontals ||
        newState.snake.head.vertical < 0 ||
        newState.snake.head.vertical >= this.state.horizontals
      ) {
        die = true;
      }

      const board = this.resetboard(newState, true);
      const score = newState.snake.tail.length * newState.scoreFactor;

      return {
        ...newState,
        die,
        board,
        score,
      };
    });
  }

  handleKeyPress(e) {
    let { currentDirection } = this.state;

    switch (e.keyCode) {
      case 37:
        currentDirection = "left";
        break;

      case 38:
        currentDirection = "up";
        break;

      case 39:
      default:
        currentDirection = "right";
        break;

      case 40:
        currentDirection = "down";
        break;
    }

    const newState = {
      ...this.state,
      currentDirection,
    };
    const board = this.resetboard(newState, true);

    this.setState((state) => {
      return {
        ...newState,
        board,
      };
    });
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeyPress);

    this.setState((state) => {
      const newState = {
        ...state,
        score: state.score,
        food: this.getRandomboard(),
        snake: {
          head: this.getCenterOfboard(),
          tail: state.snake.tail,
        },
      };
      const board = this.resetboard(newState, true);
      return {
        ...newState,
        board,
      };
    });

    this.resetboard();

    // Set tick
    window.fnInterval = setInterval(() => {
      this.gameTick();
    }, this.state.tickTime);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeyPress);
    clearInterval(window.fnInterval);
  }

  render() {
    let boardContent = this.state.board.map((board) => {
      return (
        <div
          key={board.horizontal.toString() + "-" + board.vertical.toString()}
          className={
            board.isHead
              ? "boardItem is-head"
              : board.isTail
              ? "boardItem is-tail"
              : board.isFood
              ? "boardItem is-food"
              : "boardItem"
          }
        ></div>
      );
    });
    if (this.state.die) {
      boardContent = (
        <div className="board-message">
          <h4>Game Over</h4>
        </div>
      );
    }
    return (
      <div className="snake-container wrapper">
        <div className="board-header">
          <h5>Your score: {this.state.score}</h5>
        </div>
        <div className="board">{boardContent}</div>
      </div>
    );
  }
}

export default Game;
