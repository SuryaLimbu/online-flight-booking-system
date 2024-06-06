import Booking from "@/models/Booking";
import mongoose from "mongoose";
import path from "path";

export const getAllBookings = async (req: Request) => {
  try {
    const bookings = await Booking.find();
    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
export const getBookedSeatIdsByFlight = async (req: Request) => {
  try {
    const url = new URL(req.url);
    // console.log(req);
    const flightId = url.pathname.split("/").pop();
    // console.log(id);
    if (!flightId) {
      return new Response(
        JSON.stringify({ message: "Section ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const bookings = await Booking.find({ flightId })
      .select("seatId")
      .populate("seatId");
    // const bookedSeatIds: mongoose.Schema.Types.ObjectId[] = [];

    // bookings.forEach((booking) => {
    //   bookedSeatIds.push(...booking.seatId);
    // });

    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching booked seat IDs:", error);
    throw error;
  }
};

export const getBookingById = async (req: Request) => {
  try {
    const url = new URL(req.url);
    // console.log(req);
    const id = url.pathname.split("/").pop();
    // console.log(id);
    if (!id) {
      return new Response(
        JSON.stringify({ message: "Section ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const booking = await Booking.findById(id);
    return new Response(JSON.stringify(booking), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
export const getBookingByIdwithPopulate = async (req: Request) => {
  try {
    const url = new URL(req.url);
    // console.log(req);
    const id = url.pathname.split("/").pop();
    // console.log(id);
    if (!id) {
      return new Response(
        JSON.stringify({ message: "Section ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const booking = await Booking.findById(id)
      .populate("seatId")
      .populate("aircraftId")
      .populate({
        path: "flightId",
        populate: { path: "departureAirport" },
      })
      .populate({
        path: "flightId",
        populate: { path: "arrivalAirport" },
      });
    return new Response(JSON.stringify(booking), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const getBookingByUserId = async (req: Request) => {
  try {
    const url = new URL(req.url);
    // console.log(req);
    const userId = url.pathname.split("/").pop();
    // console.log(id);
    if (!userId) {
      return new Response(
        JSON.stringify({ message: "Section ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const booking = await Booking.find({ userId: userId })
      .populate("seatId")
      .populate("aircraftId")
      .populate({
        path: "flightId",
        populate: { path: "departureAirport" },
      })
      .populate({
        path: "flightId",
        populate: { path: "arrivalAirport" },
      });

    return new Response(JSON.stringify(booking), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
export const getBookingByFlightId = async (req: Request) => {
  try {
    const url = new URL(req.url);
    // console.log(req);
    const flightId = url.pathname.split("/").pop();
    // console.log(id);
    if (!flightId) {
      return new Response(
        JSON.stringify({ message: "Section ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const booking = await Booking.find({ flightId: flightId })
      .populate("seatId")
      .populate("aircraftId");

    return new Response(JSON.stringify(booking), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const createBooking = async (req: Request) => {
  try {
    const { userId, seatId, aircraftId, passengers, flightId, totalPrice } =
      await req.json();
    const newBooking = new Booking({
      userId,
      seatId,
      aircraftId,
      passengers,
      flightId,
      totalPrice,
    });
    await newBooking.save();
    return new Response(JSON.stringify(newBooking), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
export const updateBooking = async (req: Request) => {
  try {
    const { id } = await req.json();
    const booking = await Booking.findByIdAndUpdate(id, req.json());
    return new Response(JSON.stringify(booking), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const deleteBooking = async (req: Request) => {
  try {
    const url = new URL(req.url);
    // console.log(req);
    const id = url.pathname.split("/").pop();
    // console.log(id);
    if (!id) {
      return new Response(
        JSON.stringify({ message: "Section ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    await Booking.findByIdAndDelete(id);
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
