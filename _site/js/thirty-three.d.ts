interface Cell {
    x: number;
    y: number;
}
declare class ThirthyThree {
    private grid;
    seen: Set<number>;
    numRows: number;
    numCols: number;
    maxValue: number;
    index: number;
    constructor(numRows?: number, numCols?: number, maxValue?: number);
    buildGrid(): void;
    setValue(cell: Cell, value: number | string): void;
    getCell(cell: Cell): HTMLElement;
    randPos(): Cell;
    populateCell(cell: Cell): void;
    populateGrid(): void;
    onCellClick(event: Event): void;
}
