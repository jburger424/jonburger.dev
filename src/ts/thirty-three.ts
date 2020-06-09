interface Cell {
  x: number;
  y: number;
}
class ThirthyThree {
  private grid: Array<Array<HTMLElement>> = [];
  seen: Set<number> = new Set<number>();
  numRows: number;
  numCols: number;
  maxValue: number;
  index = 1;

  constructor(numRows = 5, numCols = 5, maxValue = 33) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.maxValue = maxValue;
    this.buildGrid();
    this.populateGrid();
  }

  buildGrid() {
    const gridEl: HTMLElement | null = document.querySelector(
      'div.thirty-three'
    );
    if (!gridEl) {
      throw new Error('`div.thirty-three` does now exist.');
    }

    for (let y = 0; y < this.numRows; y++) {
      const rowEl: HTMLElement = document.createElement('div');
      const rowArr: Array<HTMLElement> = [];
      rowEl.setAttribute('class', `row-${y}`);
      for (let x = 0; x < this.numCols; x++) {
        const cell = document.createElement('div');
        cell.setAttribute('class', `col-${x}`);
        cell.setAttribute('x', `${x}`);
        cell.setAttribute('y', `${y}`);
        cell.addEventListener('click', col => this.onCellClick(col), {
          capture: true,
        });
        rowEl.appendChild(cell);
        rowArr.push(cell);
      }
      gridEl.appendChild(rowEl);
      this.grid.push(rowArr);
    }
  }

  setValue(cell: Cell, value: number | string) {
    this.grid[cell.y][cell.x].innerText = value.toString();
  }

  getCell(cell: Cell) {
    return this.grid[cell.y][cell.x];
  }

  randPos(): Cell {
    return {
      x: Math.floor(Math.random() * this.numCols),
      y: Math.floor(Math.random() * this.numRows),
    };
  }

  populateCell(cell: Cell) {
    if (this.seen.size === this.maxValue) {
      return;
    }
    let val;
    if (!this.seen.has(this.index)) {
      val = this.index;
    } else {
      do {
        val = Math.ceil(Math.random() * this.maxValue);
      } while (this.seen.has(val));
    }
    this.seen.add(val);
    this.setValue(cell, val);
  }

  populateGrid() {
    const startingPos = this.randPos();
    this.populateCell(startingPos);
    for (let y = 0; y < this.numRows; y++) {
      for (let x = 0; x < this.numCols; x++) {
        if (!(x === startingPos.x && y === startingPos.y)) {
          this.populateCell({x, y});
        }
      }
    }
  }

  onCellClick(event: Event) {
    const tempEl: HTMLElement | null = event.target as HTMLElement;
    const x = parseInt(tempEl.getAttribute('x') || '');
    const y = parseInt(tempEl.getAttribute('y') || '');
    const el = this.getCell({x, y});

    if (el.innerText === `${this.index}`) {
      el.classList.add('correct');
      this.index++;
      if (this.index <= this.maxValue + 1 - this.numRows * this.numCols) {
        this.populateCell({x, y});
      } else {
        this.setValue({x, y}, '-');
      }
    } else {
      el.classList.add('incorrect');
    }

    setTimeout(() => el.classList.remove('correct', 'incorrect'), 200);
  }
}

window.onload = () => {
  new ThirthyThree();
};
