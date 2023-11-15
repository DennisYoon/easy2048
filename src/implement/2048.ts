interface Path {
  from: [number, number];
  to: [number, number];
  result: number;
  x2: boolean;
}

interface Cell {
  num: number;
  position: number[];
  valid: boolean;
  newDueToMerge: boolean;
}

class Game {
  private board: number[][] = [];

  constructor(oboard: number[][] = []) {
    if (oboard.length == 0) {
      this.full_board();
    } else {
      this.board = oboard.slice();
    }
  }
  
  private full_board() {
    for (let i = 0; i < 4; i++) {
      this.board.push([]);
      for (let j = 0; j < 4; j++) {
        this.board[i].push(0);
      }
    }
  }

  public reset() {
    this.board = [];
    this.full_board();
  }

  private static randrange(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // public begin() {
    // this.fill(false);
    // this.fill();
  // }

  private is_fulled(): boolean {
    let not_fulled = false;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] == 0) {
          not_fulled = true;
          break;
        }
      }
      if (not_fulled) {
        break;
      }
    }

    return !not_fulled;
  }

  public fill(showing = true): Cell {
    if (this.is_fulled()) {
      return {
        num: -1,
        position: [-1, -1],
        valid: false,
        newDueToMerge: false
      };
    }

    const random_num = Game.randrange(0, 9);
    const num_to_fill = random_num == 0 ? 4 : 2;
    
    let row = Game.randrange(0, 3);
    let column = Game.randrange(0, 3);

    while (this.board[row][column] != 0) {
      if (column == 0) {
        row = row == 0 ? 3 : row - 1;
        column = 3;
      } else {
        column--;
      }
    }
    this.board[row][column] = num_to_fill;

    if (showing) {
      this.show();
    }

    return {
      num: num_to_fill,
      position: [row, column],
      valid: true,
      newDueToMerge: false
    };
  }

  private show() {
    console.clear();
    for (let row = 0; row < 4; row++) {
      let content = "";
      for (let column = 0; column < 4; column++) {
        content += this.board[row][column].toString().padStart(7, " ");
      }
      console.log(content);
    }
  }

  private static push_path(paths: Path[], path: Path, x2: boolean) {
    if (path.from.toString() == path.to.toString() && !x2) {
      return;
    }
    paths.push(path);
  }

  private static transpose(original: number[][]): number[][] {
    const rowOfOrigin = original.length;
    const colOfOrigin = original[0].length;
    const transposed = Array.from({ length: colOfOrigin }, () => new Array(rowOfOrigin).fill(0));
    for(let i = 0; i < rowOfOrigin; i++) {
      for(let j = 0; j < colOfOrigin; j++) {
        [transposed[j][i]] = [original[i][j]];  
      }
    }
    return transposed;
  }
  // 출처: https://velog.io/@dyongdi/JS-2%EC%B0%A8%EC%9B%90-%EB%B0%B0%EC%97%B4%EC%9D%98-%ED%96%89%EA%B3%BC-%EC%97%B4-%EB%B0%94%EA%BE%B8%EA%B8%B0-Transposing-a-2D-array-in-JavaScript

  public move(ndirection: number): Path[] {
    let path: Path[] = [];

    const begin_num = (ndirection % 2) * 3;
    const way = ((ndirection % 2) - 0.5) * (-2);

    if (ndirection <= 1) {
      this.board = Game.transpose(this.board);
    }

    for (let row = 0; row <= 3; row++) {
      let order = begin_num;
      let index = -1;

      for (
        let column = begin_num;
        begin_num ? column >= 0 : column <= 3;
        column += way
      ) {
        if (this.board[row][column] != 0) {
          if (index == -1) {
            index = column;
          } else {
            const the_num = this.board[row][index];
            if (this.board[row][column] == this.board[row][index]) {
              this.board[row][index] = this.board[row][column] = 0;
              this.board[row][order] = the_num * 2;

              Game.push_path(path, {
                from: [row, column],
                to: [row, order],
                result: this.board[row][order],
                x2: true
              }, true);
              Game.push_path(path, {
                from: [row, index],
                to: [row, order],
                result: this.board[row][order],
                x2: true
              }, true);

              index = -1;
            } else {
              this.board[row][index] = 0;
              this.board[row][order] = the_num;
              Game.push_path(path, {
                from: [row, index],
                to: [row, order],
                result: this.board[row][order],
                x2: false
              }, false);
              index = column;
            }
            order += way;
          }
        }
      }

      if (index != -1) {
        const the_num = this.board[row][index];
        this.board[row][index] = 0;
        this.board[row][order] = the_num;

        Game.push_path(path, {
          from: [row, index],
          to: [row, order],
          result: this.board[row][order],
          x2: false
        }, false);
      }
    }

    if (ndirection <= 1) {
      this.board = Game.transpose(this.board);
      path = path.map(v => {
        return {
          from: [v.from[1], v.from[0]],
          to: [v.to[1], v.to[0]],
          result: v.result,
          x2: v.x2
        };
      });
    }

    return path;
  }

  public is_over() {
    let not_over = false;

    for (let ndirection = 0; ndirection < 4; ndirection++) {
      const abgame = new Game(this.board);
      const path = abgame.move(ndirection);
      if (path.length != 0) {
        not_over = true;
        break;
      }
    }

    return !not_over;
  }
}

export { Game, Cell };