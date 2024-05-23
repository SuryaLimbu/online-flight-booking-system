import User from "@/models/User";

export const getAllUsers = async (req: Request) => {
  try {
    const users = await User.find();
    return new Response(JSON.stringify(users), {
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

export const getUserById = async (req: Request) => {
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
    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const createUser = async (req: Request) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      contactDetails,
      gender,
      roleId,
      dateOfBirth,
      nationality,
      passportNumber,
    } = await req.json();
    
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      address,
      contactDetails,
      gender,
      roleId,
      dateOfBirth,
      nationality,
      passportNumber,
    });
    await newUser.save();

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const updateUser = async (req: Request) => {
  try {
    const { id } = await req.json();
    const section = await User.findByIdAndUpdate(id, req.json());
    return new Response(JSON.stringify(section), {
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
export const deleteUser = async (req: Request) => {
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
    const section = await User.findByIdAndDelete(id);
    return new Response(JSON.stringify(section), {
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
