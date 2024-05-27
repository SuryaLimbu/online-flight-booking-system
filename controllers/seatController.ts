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

export const createSeat = async (req: Request) => {
  try {
    const { sectionId, rowNumber, position,status } = await req.json();
    const newSeat = new Seat({
      sectionId,
      rowNumber,
      position,
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
