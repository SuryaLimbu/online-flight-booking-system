import connectDB from "@/lib/mongodb";
import Seat from "@/models/Seat";

const predefinedSeats: {
  left: { [key: string]: string | null };
  right: { [key: string]: string | null };
}[] = [
  ...Array.from({ length: 3 }, () => ({
    left: { A: null, B: null },
    right: { C: null, D: null },
  })),
  ...Array.from({ length: 4 }, () => ({
    left: { A: null, B: null },
    right: { C: null, D: null },
  })),
  ...Array.from({ length: 13 }, () => ({
    left: { A: null, B: null, C: null },
    right: { D: null, E: null, F: null },
  })),
];

const firstclass = "665e53c83e49581bc2e19cc8";
const businessclass = "665e53d63e49581bc2e19cca";
const economyclass = "665e53b43e49581bc2e19cc6";

async function saveSeat(
  sectionId: string,
  rowNumber: number,
  position: string,
  status: string | null
) {
  const seatName = rowNumber + position;
  const seat = new Seat({
    sectionId: sectionId,
    rowNumber,
    position,
    seatName,
    status: status === null ? "available" : status,
  });
  await seat.save();
}

export async function POST(req: Request) {
  await connectDB();

  let rowNumber = 1;

  for (const row of predefinedSeats) {
    if (rowNumber <= 3) {
      for (const position of ["A", "B"]) {
        await saveSeat(firstclass, rowNumber, position, row.left[position]);
      }
      for (const position of ["C", "D"]) {
        await saveSeat(firstclass, rowNumber, position, row.right[position]);
      }
    } else if (rowNumber <= 7) {
      for (const position of ["A", "B", "C"]) {
        await saveSeat(businessclass, rowNumber, position, row.left[position]);
      }
      for (const position of ["D", "E", "F"]) {
        await saveSeat(businessclass, rowNumber, position, row.right[position]);
      }
    } else if(rowNumber <= 20){
      for (const position of ["A", "B", "C"]) {
        await saveSeat(economyclass, rowNumber, position, row.left[position]);
      }
      for (const position of ["D", "E", "F"]) {
        await saveSeat(economyclass, rowNumber, position, row.right[position]);
      }
    }
    rowNumber++;
  }

  return new Response(JSON.stringify({ message: "Seats have been inserted" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
