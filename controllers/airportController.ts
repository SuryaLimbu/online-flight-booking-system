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
    const url = new URL(req.url);
    // console.log(req);
    const id = url.pathname.split("/").pop();
    // console.log(id);
    if (!id) {
      return new Response(
        JSON.stringify({ message: "Aircraft ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
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
    const url = new URL(req.url);
    const _id = url.pathname.split("/").pop();
    // console.log("Updating airport with ID:", _id);
    
    if (!_id) {
      return new Response(
        JSON.stringify({ message: "Aircraft ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { airportCode, airportName, location } = await req.json();
    if (!airportCode || !airportName || !location) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const updateFields = {
      airportCode,
      airportName,
      location,
    };

    const airport = await Airport.findByIdAndUpdate(_id, updateFields, { new: true });
    if (!airport) {
      return new Response(
        JSON.stringify({ message: "Airport not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(JSON.stringify(airport), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating airport:", error);
    return new Response(JSON.stringify({ error}), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const deleteAirport = async (req: Request) => {
  try {
    const url = new URL(req.url);
    // console.log(req);
    const id = url.pathname.split("/").pop();
    // console.log(id);
    if (!id) {
      return new Response(
        JSON.stringify({ message: "Airport ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
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
