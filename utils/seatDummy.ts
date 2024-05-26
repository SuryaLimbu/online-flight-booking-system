import mongoose from "mongoose";
import Seat from "../models/Seat.js";
// Replace with your MongoDB connection string

const mongoURI = "mongodb+srv://suryamankedem:EB7sp0JHavTlarFf@onlineticketbookingsyst.hlkb0zj.mongodb.net/?retryWrites=true&w=majority&appName=onlineTicketBookingSystem"
console.log(mongoURI);
// Connect to MongoDB
mongoose
  .connect(mongoURI,{bufferCommands: false})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Function to generate seat data
const generateSeats = (start:number, end:number, label:number) => {
  const seats = [];

  for (let i = start; i <= end; i++) {
    for (let j = 0; j < label; j++) {
      const seatLabel = `${i}${String.fromCharCode(65 + j)}`;
      seats.push({
        sectionId: new mongoose.Types.ObjectId(), // Replace with actual sectionId if available
        seatCode: seatLabel,
        seatStatus: "available", // or any other default status
      });
    }
  }
  return seats;
};

// Define your parameters
const start = 1;
const end = 10;
const label = 5; // Number of seats per row

// Generate the seats

const firstclassDummyData = generateSeats(1, 3, 4);
const businessDummyData = generateSeats(4, 7, 6);
const economyDummyData = generateSeats(8, 19, 6);
// console.log(businessDummyData);

// Insert the generated seats into the database
const insertGeneratedSeats = async () => {
  try {
    await Seat.insertMany(firstclassDummyData);
    await Seat.insertMany(businessDummyData);
    await Seat.insertMany(economyDummyData);
    console.log("Generated seats inserted successfully");
  } catch (err) {
    console.error("Error inserting generated seats:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the insert function
insertGeneratedSeats();
