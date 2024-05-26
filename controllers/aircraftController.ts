import Aircraft from "@/models/Aircraft";

export const getAllAircraft = async (req: Request) => {
  try {
    const aircrafts = await Aircraft.find({});
    return new Response(JSON.stringify(aircrafts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: "Error", error: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Unknown error occurred" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
};

export const getAircraftById = async (req: Request) => {
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
    const aircraft = await Aircraft.findById(id);
    if (!aircraft) {
      return new Response(JSON.stringify({ message: "Aircraft not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(aircraft), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: "Error", error: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Unknown error occurred" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
};

export const createAircraft = async (req: Request) => {
  try {
    const { aircraftRegisteredNumber, aircraftModel, capacity } =
      await req.json();
    const newAircraft = new Aircraft({
      aircraftRegisteredNumber,
      aircraftModel,
      capacity,
    });
    await newAircraft.save();

    return new Response(
      JSON.stringify({ message: "aircraft created successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: "Error", error: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Unknown error occurred" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
};

export const updateAircraft = async (req: Request) => {
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

    const { aircraftRegisteredNumber, aircraftModel, capacity } =
      await req.json();
    const updateFields = {
      aircraftRegisteredNumber,
      aircraftModel,
      capacity,
    };

    const aircraft = await Aircraft.findOneAndUpdate({ _id }, updateFields, {
      new: true,
    });
    if (!aircraft) {
      return new Response(JSON.stringify({ message: "Aircraft not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({ message: "Aircraft updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: "Error", error: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Unknown error occurred" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
};

export const deleteAircraft = async (req: Request) => {
  try {
    const url = new URL(req.url);
    // console.log(req);
    const id = url.pathname.split("/").pop();
    console.log(id);
    if (!id) {
      return new Response(
        JSON.stringify({ message: "Aircraft ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const airport = await Aircraft.findByIdAndDelete(id);
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