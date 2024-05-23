import Flight from "@/models/Flight";

export const getAllFlights = async (req: Request) => {
  try {
    const flight = await Flight.find();
    return new Response(JSON.stringify(flight), {
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

export const getFlightById = async (req: Request) => {
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
    const flight = await Flight.findById(id);
    if (!flight) {
      return new Response(JSON.stringify({ message: "Flight not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(flight), {
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

export const createFlight = async (req: Request) => {
  try {
    const {
      flightNumber,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      aircraft,
    } = await req.json();

    const newFlight = new Flight({
      flightNumber,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      aircraft,
    });
    await newFlight.save();

    return new Response(JSON.stringify(newFlight), {
      status: 201,
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

export const updateFlight = async (req: Request) => {
  try {
    const { id } = await req.json();
    const flight = await Flight.findByIdAndUpdate(id, req.json());
    return new Response(JSON.stringify(flight), {
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

export const deleteFlight = async (req: Request) => {
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
    await Flight.findByIdAndDelete(id);
    if (!id) {
      return new Response(JSON.stringify({ message: "Flight not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
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
