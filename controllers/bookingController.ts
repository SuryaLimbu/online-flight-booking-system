import Booking from "@/models/Booking";

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
export const getBookingById = async (req: Request) => {
  try {
    const { id } = await req.json();
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

export const createBooking = async (req: Request) => {
  try {
    const { userId, seatId, aircraftId, passengerId, flightId, totalPrice } =
      await req.json();
    const newBooking = new Booking({
      userId,
      seatId,
      aircraftId,
      passengerId,
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
    const { id } = await req.json();
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
