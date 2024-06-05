import User from "@/models/User";
import bcrypt from "bcrypt";

export const login = async (req: Request) => {
  
  try {
    const { email, password } = await req.json();
  
    const user = await User.findOne({ email }).populate("roleId");
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    console.log("User:", user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Incorrect password" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to login" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
