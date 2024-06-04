import Seat from "@/models/Seat";

export const getAllSeats = async (req: Request) => {
  try {
    const seat = await Seat.find();
    return new Response(JSON.stringify(seat), {
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

export const getSeatById = async (req: Request) => {
  try {
    const seat = await Seat.findById(req.json());
    return new Response(JSON.stringify(seat), {
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
export const getSeatByName = async (req: Request) => {
  try {
    // Extract the URL from the request
    const url = new URL(req.url);

    // Get the seat name from the URL path
    const seatName = url.pathname.split("/").pop();

    // Check if seat name is provided
    if (!seatName) {
      return new Response(
        JSON.stringify({ message: "Seat name is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Find the seat by name and populate the sectionId field
    const seat = await Seat.find({ seatName }).populate("sectionId");

    // Check if the seat is found
    if (!seat || seat.length === 0) {
      return new Response(
        JSON.stringify({ message: "Seat not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Log the retrieved seat data for debugging
    // console.log("Retrieved seat data:", seat);

    // Return the seat data in the response
    return new Response(JSON.stringify(seat), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    // Log the error for debugging
    console.error("Error retrieving seat:", error);

    // Extract meaningful error information
    const errorMessage = error.message || "An unknown error occurred";
    const errorStack = error.stack || "No stack trace available";

    // Return an error response with detailed information
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error: errorMessage, stack: errorStack }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
  }
};


export const createSeat = async (req: Request) => {
  try {
    const { sectionId, rowNumber, position, seatName, status } =
      await req.json();
    const newSeat = new Seat({
      sectionId,
      rowNumber,
      position,
      seatName,
      status,
    });
    return new Response(JSON.stringify(newSeat), {
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

export const updateSeat = async (req: Request) => {
  try {
    const { id } = await req.json();
    const seat = await Seat.findByIdAndUpdate(id, req.json(), {
      new: true,
    });
    return new Response(JSON.stringify(seat), {
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

export const deleteSeat = async (req: Request) => {
  try {
    const url = new URL(req.url);
    // console.log(req);
    const id = url.pathname.split("/").pop();
    // console.log(id);
    if (!id) {
      return new Response(JSON.stringify({ message: "Seat ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const seat = await Seat.findByIdAndDelete(id);
    if (!seat) {
      return new Response(JSON.stringify({ message: "Seat not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(seat), {
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
