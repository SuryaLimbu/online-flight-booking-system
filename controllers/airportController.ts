import Airport from "@/models/Airport";

export const getAllAirports = async (req: Request) => {
  try {
    const airports = await Airport.find();
    return new Response(JSON.stringify(airports), {
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

export const getAirportById = async (req: Request) => {
  try {
    const { id } = await req.json();
    const airport = await Airport.findById(id);
    return new Response(JSON.stringify(airport), {
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

export const createAirport = async (req: Request) => {
  try {
    const { airportCode, airportName, location } = await req.json();
    const newAirport = new Airport({
      airportCode,
      airportName,
      location,
    });
    await newAirport.save();

    return new Response(
      JSON.stringify({ message: "airport created successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const updateAirport = async (req: Request) => {
  try {
    const { id } = await req.json();
    const airport = await Airport.findByIdAndUpdate(id, req.json());
    return new Response(JSON.stringify(airport), {
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

export const deleteAirport = async (req: Request) => {
  try {
    const { id } = await req.json();
    const airport = await Airport.findByIdAndDelete(id);
    return new Response(JSON.stringify(airport), {
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
