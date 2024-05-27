import Flight from "@/models/Flight";
import { URL } from "url";

export const getAllFlights = async (req: Request) => {
  try {
    const flight = await Flight.find()
     .populate("departureAirport")
     .populate("arrivalAirport")
     .populate("aircraft");
    console.log("flight:", JSON.stringify(flight));
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

export const specificFlightData = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const departureDate = searchParams.get("departureDate")+"T00:00:00.000Z";
  const cabinClass = searchParams.get("cabinClass");
  const totalTravelers = searchParams.get("totalTravelers");

  const newDataTypeConverter = new Date(departureDate);

  // console.log("searchParams: ", newDataTypeConverter);

  if (!from || !to || !departureDate || !cabinClass || !totalTravelers) {
    return Response.json(
      { error: "Missing required query parameters" },
      { status: 400 }
    );
  }

  try {
    const flights = await Flight.find({
      departureAirport: from,
      arrivalAirport: to,
      // departureTime: newDataTypeConverter
    })
      .populate("departureAirport")
      .populate("arrivalAirport")
      .populate("aircraft");

      // console.log("flights from searchflight api:", JSON.stringify(flights));

    return Response.json(flights, { status: 200 });
  } catch (error) {
    console.error("Error fetching flights:", error);
    return Response.json(
      { error: "Failed to fetch flight data" },
      { status: 500 }
    );
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
      status,
    } = await req.json();

    const newFlight = new Flight({
      flightNumber,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      aircraft,
      status,
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
