type Seat = { [key: string]: boolean | null };

export class AircraftSeating {
  numRows: number;
  firstClassStartRow: number;
  firstClassEndRow: number;
  businessClassStartRow: number;
  businessClassEndRow: number;
  economyClassStartRow: number;
  economyClassEndRow: number;
  seats: { left: Seat; right: Seat }[];

  constructor(
    numRows: number,
    firstClassStartRow: number,
    firstClassEndRow: number,
    businessClassStartRow: number,
    businessClassEndRow: number,
    economyClassStartRow: number,
    economyClassEndRow: number,
    bookedSeats: [number, string][] = []
  ) {
    this.numRows = numRows;
    this.firstClassStartRow = firstClassStartRow;
    this.firstClassEndRow = firstClassEndRow;
    this.businessClassStartRow = businessClassStartRow;
    this.businessClassEndRow = businessClassEndRow;
    this.economyClassStartRow = economyClassStartRow;
    this.economyClassEndRow = economyClassEndRow;
    this.seats = this.initializeSeating(numRows);
    this.updateBookedSeats(bookedSeats);
  }

  initializeSeating(numRows: number): { left: Seat; right: Seat }[] {
    const seats = [];
    for (let i = 0; i < numRows; i++) {
      const row = {
        left: { A: null, B: null, C: null },
        right: { D: null, E: null, F: null },
      };
      seats.push(row);
    }
    return seats;
  }

  updateBookedSeats(bookedSeats: [number, string][]): void {
    for (const [rowNumber, column] of bookedSeats) {
      if (rowNumber >= 1 && rowNumber <= this.numRows) {
        const side: "left" | "right" =
          column in { A: 1, B: 1, C: 1 } ? "left" : "right";
        if (column in this.seats[rowNumber - 1][side]) {
          this.seats[rowNumber - 1][side][column] = true;
        }
      }
    }
  }

  displaySeating(): string {
    let layout = "Seating Layout:\n";
    this.seats.forEach((row, rowIndex) => {
      const leftSeats = Object.entries(row.left)
        .map(([col, seat]) => `${col}:${seat ? "X" : "O"}`)
        .join(" ");
      const rightSeats = Object.entries(row.right)
        .map(([col, seat]) => `${col}:${seat ? "X" : "O"}`)
        .join(" ");
      layout += `Row ${rowIndex + 1}: ${leftSeats} || ${rightSeats}\n`;
    });
    return layout;
  }

  bookSeat(rowNumber: number, column: string): string[] | any {
    if (rowNumber < 1 || rowNumber > this.numRows) {
      return "Invalid row number.";
    }

    const side: "left" | "right" =
      column in { A: 1, B: 1, C: 1 } ? "left" : "right";
    if (column in this.seats[rowNumber - 1][side]) {
      const bookedSeats: string[] = [];
      if (!this.seats[rowNumber - 1][side][column]) {
        if (
          rowNumber > this.firstClassEndRow &&
          this.isMiddleSeat(column) &&
          this.bothAdjacentSeatsEmpty(rowNumber - 1, column, side)
        ) {
          return `Cannot book middle seat ${rowNumber}${column} alone if both adjacent seats are unbooked.`;
        }
        this.seats[rowNumber - 1][side][column] = true;
        bookedSeats.push(`${rowNumber}${column}`);
        return bookedSeats;
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

    const side: "left" | "right" =
      column in { A: 1, B: 1, C: 1 } ? "left" : "right";
    if (column in this.seats[rowNumber - 1][side]) {
      return !this.seats[rowNumber - 1][side][column];
    } else {
      return "Invalid seat column.";
    }
  }

  bulkBookSeats(seatRequests: [number, string][]): string[] | any {
    const bookedSeats: string[] = [];
    if (seatRequests.length > 6) {
      return "Cannot book more than 6 seats in a single transaction.";
    }

    console.log("Seats requested in bulk function", seatRequests);

    for (const [rowNumber, column] of seatRequests) {
      if (rowNumber < 1 || rowNumber > this.numRows) {
        return `Invalid row number ${rowNumber}.`;
      }
      const side: "left" | "right" =
        column in { A: 1, B: 1, C: 1 } ? "left" : "right";
      if (!(column in this.seats[rowNumber - 1][side])) {
        return `Invalid seat column ${column}.`;
      }
      if (this.seats[rowNumber - 1][side][column]) {
        return `Seat ${rowNumber}${column} is already booked.`;
      }
    }

    // At this point, all validations have passed
    for (const [rowNumber, column] of seatRequests) {
      const side: "left" | "right" =
        column in { A: 1, B: 1, C: 1 } ? "left" : "right";
      this.seats[rowNumber - 1][side][column] = true;
      bookedSeats.push(`${rowNumber}${column}`);
    }
    console.log("Seats booked in bulk function", bookedSeats);

    return bookedSeats;
  }

  autoBookSeats(
    numSeats: number,
    seatClass: "first" | "business" | "economy"
  ): string {
    if (numSeats < 1 || numSeats > 6) {
      return "Can only auto-book between 1 and 6 seats.";
    }

    const bookedSeats: string[] = [];
    const sides = ["left", "right"] as const;
    let startRow: number;
    let endRow: number;

    if (seatClass === "first") {
      startRow = this.firstClassStartRow;
      endRow = this.firstClassEndRow;
    } else if (seatClass === "business") {
      startRow = this.businessClassStartRow;
      endRow = this.businessClassEndRow;
    } else {
      startRow = this.economyClassStartRow;
      endRow = this.economyClassEndRow;
    }

    // First, try to book seats on the left side from front to back
    for (
      let rowIndex = startRow - 1;
      rowIndex < endRow && bookedSeats.length < numSeats;
      rowIndex++
    ) {
      const row = this.seats[rowIndex];
      const columns = Object.keys(row.left);
      for (
        let i = 0;
        i < columns.length && bookedSeats.length < numSeats;
        i++
      ) {
        if (!row.left[columns[i]]) {
          row.left[columns[i]] = true;
          bookedSeats.push(`${rowIndex + 1}${columns[i]}`);
          if (bookedSeats.length === numSeats) {
            return JSON.stringify(bookedSeats);
          }
        }
      }
    }

    // If needed, book seats on the right side from back to front
    for (
      let rowIndex = endRow - 1;
      rowIndex >= startRow - 1 && bookedSeats.length < numSeats;
      rowIndex--
    ) {
      const row = this.seats[rowIndex];
      const columns = Object.keys(row.right);
      for (
        let i = 0;
        i < columns.length && bookedSeats.length < numSeats;
        i++
      ) {
        if (!row.right[columns[i]]) {
          row.right[columns[i]] = true;
          bookedSeats.push(`${rowIndex + 1}${columns[i]}`);
          if (bookedSeats.length === numSeats) {
            return JSON.stringify(bookedSeats);
          }
        }
      }
    }

    return bookedSeats.length === numSeats
      ? JSON.stringify(bookedSeats)
      : "Unable to find the required number of adjacent seats.";
  }

  isMiddleSeat(column: string): boolean {
    return column === "B" || column === "E";
  }

  bothAdjacentSeatsEmpty(
    rowIndex: number,
    column: string,
    side: "left" | "right"
  ): boolean {
    const columns = Object.keys(this.seats[rowIndex][side]);
    const colIndex = columns.indexOf(column);

    if (colIndex > 0 && colIndex < columns.length - 1) {
      const leftSeat = columns[colIndex - 1];
      const rightSeat = columns[colIndex + 1];
      if (
        !this.seats[rowIndex][side][leftSeat] &&
        !this.seats[rowIndex][side][rightSeat]
      ) {
        return true;
      }
    }
    return false;
  }

  wouldLeaveSingleScatteredSeatInRange(
    columns: string[],
    start: number,
    end: number,
    rowSide: Seat
  ): boolean {
    if (start > 0 && !rowSide[columns[start - 1]] && rowSide[columns[start]]) {
      return true;
    }
    if (
      end < columns.length &&
      !rowSide[columns[end]] &&
      rowSide[columns[end - 1]]
    ) {
      return true;
    }
    return false;
  }
}

// // Example usage:
// const bookedSeatsFromApi: [number, string][] = [
//     [1, 'A'], [2, 'B'], [3, 'C'], [4, 'D']
// ];

// const aircraft = new AircraftSeating(10, 1, 3, 4, 7, 8, 10, bookedSeatsFromApi);

// // Display initial seating layout
// console.log(aircraft.displaySeating());

// // Book some seats individually
// console.log(aircraft.bookSeat(1, 'B'));  // Should allow (first class)
// console.log(aircraft.bookSeat(1, 'C'));  // Should allow (first class)
// console.log(aircraft.bookSeat(3, 'B'));  // Should not allow if 3A and 3C are not booked
// console.log(aircraft.bookSeat(4, 'E'));  // Should not allow if 4D and 4F are not booked

// // Display updated seating layout
// console.log(aircraft.displaySeating());

// // Bulk booking
// console.log(aircraft.bulkBookSeats([[3, 'A'], [3, 'B'], [3, 'C'], [3, 'D'], [3, 'E'], [3, 'F']]));  // Should allow
// console.log(aircraft.bulkBookSeats([[4, 'E'], [4, 'F']]));  // Should allow
// console.log(aircraft.bulkBookSeats([[4, 'C'], [4, 'E']]));  // Should not allow

// // Display final seating layout
// console.log(aircraft.displaySeating());

// // Auto-book seats
// console.log(aircraft.autoBookSeats(2, 'first'));  // Should book up to 2 seats in first class
// console.log(aircraft.autoBookSeats(4, 'business'));  // Should book up to 4 seats in business class
// console.log(aircraft.autoBookSeats(6, 'economy'));
// console.log("first class: ",aircraft.autoBookSeats(6, 'first'));   // Should book up to 6 seats in economy class
// console.log("first class: ",aircraft.autoBookSeats(2, 'first'));
// console.log(aircraft.autoBookSeats(7, 'business'));  // Should not book and return an error

// // Display final seating layout after auto-booking
// console.log(aircraft.displaySeating());
