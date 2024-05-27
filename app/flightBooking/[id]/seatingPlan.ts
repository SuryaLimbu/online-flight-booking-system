type Seat = { [key: string]: boolean | null };

export class AircraftSeating {
    numRows: number;
    seats: { left: Seat; right: Seat }[];

    constructor(numRows: number) {
        this.numRows = numRows;
        this.seats = this.initializeSeating(numRows);
    }

    initializeSeating(numRows: number): { left: Seat; right: Seat }[] {
        const seats = [];
        for (let i = 0; i < numRows; i++) {
            const row = {
                left: { 'A': null, 'B': null, 'C': null },
                right: { 'D': null, 'E': null, 'F': null }
            };
            seats.push(row);
        }
        return seats;
    }

    displaySeating(): string {
        let layout = "Seating Layout:\n";
        this.seats.forEach((row, rowIndex) => {
            const leftSeats = Object.entries(row.left).map(([col, seat]) => `${col}:${seat ? 'X' : 'O'}`).join(' ');
            const rightSeats = Object.entries(row.right).map(([col, seat]) => `${col}:${seat ? 'X' : 'O'}`).join(' ');
            layout += `Row ${rowIndex + 1}: ${leftSeats} || ${rightSeats}\n`;
        });
        return layout;
    }

    bookSeat(rowNumber: number, column: string): string {
        if (rowNumber < 1 || rowNumber > this.numRows) {
            return "Invalid row number.";
        }

        const side: 'left' | 'right' = column in { 'A': 1, 'B': 1, 'C': 1 } ? 'left' : 'right';
        if (column in this.seats[rowNumber - 1][side]) {
            if (!this.seats[rowNumber - 1][side][column]) {
                if (this.isMiddleSeat(column) && this.wouldLeaveSingleScatteredSeat(rowNumber - 1, column, side)) {
                    return `Cannot book middle seat ${rowNumber}${column} alone due to potential single scattered seats.`;
                }
                this.seats[rowNumber - 1][side][column] = true;
                return `Seat ${rowNumber}${column} successfully booked.`;
            } else {
                return `Seat ${rowNumber}${column} is already booked.`;
            }
        } else {
            return "Invalid seat column.";
        }
    }

    checkSeatAvailability(rowNumber: number, column: string): boolean | string {
        if (rowNumber < 1 || rowNumber > this.numRows) {
            return "Invalid row number.";
        }

        const side: 'left' | 'right' = column in { 'A': 1, 'B': 1, 'C': 1 } ? 'left' : 'right';
        if (column in this.seats[rowNumber - 1][side]) {
            return !this.seats[rowNumber - 1][side][column];
        } else {
            return "Invalid seat column.";
        }
    }

    bulkBookSeats(seatRequests: [number, string][]): string {
        if (seatRequests.length > 6) {
            return "Cannot book more than 6 seats in a single transaction.";
        }

        for (const [rowNumber, column] of seatRequests) {
            if (rowNumber < 1 || rowNumber > this.numRows) {
                return `Invalid row number ${rowNumber}.`;
            }
            const side: 'left' | 'right' = column in { 'A': 1, 'B': 1, 'C': 1 } ? 'left' : 'right';
            if (!(column in this.seats[rowNumber - 1][side])) {
                return `Invalid seat column ${column}.`;
            }
            if (this.seats[rowNumber - 1][side][column]) {
                return `Seat ${rowNumber}${column} is already booked.`;
            }
            if (this.isMiddleSeat(column) && this.wouldLeaveSingleScatteredSeat(rowNumber - 1, column, side)) {
                return `Cannot book middle seat ${rowNumber}${column} alone due to potential single scattered seats.`;
            }
        }

        // If all requested seats are available, book them
        for (const [rowNumber, column] of seatRequests) {
            const side: 'left' | 'right' = column in { 'A': 1, 'B': 1, 'C': 1 } ? 'left' : 'right';
            this.seats[rowNumber - 1][side][column] = true;
        }

        return "Seats successfully booked.";
    }

    autoBookSeats(numSeats: number): string {
        if (numSeats < 1 || numSeats > 6) {
            return "Can only auto-book between 1 and 6 seats.";
        }

        for (let rowIndex = 0; rowIndex < this.seats.length; rowIndex++) {
            const row = this.seats[rowIndex];
            for (const side of ['left', 'right'] as const) {
                const columns = Object.keys(row[side]);
                for (let i = 0; i <= columns.length - numSeats; i++) {
                    if (columns.slice(i, i + numSeats).every(col => !row[side][col])) {
                        if (!this.wouldLeaveSingleScatteredSeatInRange(columns, i, i + numSeats, row[side])) {
                            columns.slice(i, i + numSeats).forEach(col => row[side][col] = true);
                            const seatList = columns.slice(i, i + numSeats).map(col => `${rowIndex + 1}${col}`);
                            return `Seats ${seatList.join(' ')} successfully booked.`;
                        }
                    }
                }
            }
        }

        for (let rowIndex = 0; rowIndex < this.seats.length; rowIndex++) {
            const row = this.seats[rowIndex];
            for (const side of ['left', 'right'] as const) {
                const columns = Object.keys(row[side]);
                const availableSeats: [number, string][] = [];
                for (const col of columns) {
                    if (!row[side][col]) {
                        availableSeats.push([rowIndex + 1, col]);
                    } else {
                        availableSeats.length = 0;
                    }
                    if (availableSeats.length === numSeats) {
                        if (!this.wouldLeaveSingleScatteredSeatInRange(columns, columns.indexOf(availableSeats[0][1]), columns.indexOf(availableSeats[availableSeats.length - 1][1]) + 1, row[side])) {
                            availableSeats.forEach(([r, c]) => {
                                const s: 'left' | 'right' = c in { 'A': 1, 'B': 1, 'C': 1 } ? 'left' : 'right';
                                this.seats[r - 1][s][c] = true;
                            });
                            const seatList = availableSeats.map(([r, c]) => `${r}${c}`);
                            return `Seats ${seatList.join(' ')} successfully booked.`;
                        }
                    }
                }
            }
        }

        return "Unable to find the required number of adjacent seats.";
    }

    isMiddleSeat(column: string): boolean {
        return column === 'B' || column === 'E';
    }

    wouldLeaveSingleScatteredSeat(rowIndex: number, column: string, side: 'left' | 'right'): boolean {
        const columns = Object.keys(this.seats[rowIndex][side]);
        const colIndex = columns.indexOf(column);

        if (colIndex > 0 && colIndex < columns.length - 1) {
            const leftSeat = columns[colIndex - 1];
            const rightSeat = columns[colIndex + 1];
            if (!this.seats[rowIndex][side][leftSeat] && !this.seats[rowIndex][side][rightSeat]) {
                return false;
            }
        }

        if (colIndex > 0 && !this.seats[rowIndex][side][columns[colIndex - 1]] && this.seats[rowIndex][side][column]) {
            return true;
        }
        if (colIndex < columns.length - 1 && !this.seats[rowIndex][side][columns[colIndex + 1]] && this.seats[rowIndex][side][column]) {
            return true;
        }
        return false;
    }

    wouldLeaveSingleScatteredSeatInRange(columns: string[], start: number, end: number, rowSide: Seat): boolean {
        if (start > 0 && !rowSide[columns[start - 1]] && rowSide[columns[start]]) {
            return true;
        }
        if (end < columns.length && !rowSide[columns[end]] && rowSide[columns[end - 1]]) {
            return true;
        }
        return false;
    }
}

// Example usage:
const aircraft = new AircraftSeating(10);

// Display initial seating layout
console.log(aircraft.displaySeating());

// Book some seats individually
console.log(aircraft.bookSeat(1, 'B'));  // Should not allow
console.log(aircraft.bookSeat(1, 'A'));  // Should allow
console.log(aircraft.bookSeat(1, 'B'));  // Should allow now
console.log(aircraft.bookSeat(2, 'E'));  // Should not allow

// Display updated seating layout
console.log(aircraft.displaySeating());

// Bulk booking
console.log(aircraft.bulkBookSeats([[3, 'B'], [3, 'C'], [3, 'D'], [3, 'E'], [4, 'A'], [4, 'B']]));  // Should allow
console.log(aircraft.bulkBookSeats([[3, 'E'], [4, 'E']]));  // Should not allow

// Display final seating layout
console.log(aircraft.displaySeating());

// Auto-book seats
console.log(aircraft.autoBookSeats(2));
console.log(aircraft.autoBookSeats(6)); // Should book up to 6 seats
console.log(aircraft.autoBookSeats(7)); // Should not book and return an error

// Display final seating layout after auto-booking
console.log(aircraft.displaySeating());
