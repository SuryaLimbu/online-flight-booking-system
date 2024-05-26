import Role from "@/models/Role";

export const getAllRoles = async (req: Request) => {
  try {
    const roles = await Role.find();
    return new Response(JSON.stringify(roles), {
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

export const getRoleById = async (req: Request) => {
  const url = new URL(req.url);
  // console.log(req);
  const id = url.pathname.split("/").pop();
  // console.log(id);
  if (!id) {
    return new Response(JSON.stringify({ message: "Section ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const role = await Role.findById(id);
  return new Response(JSON.stringify(role), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createRole = async (req: Request) => {
  try {
    const { roleName, permissions } = await req.json();
    // console.log(name, permissions);
    const newRole = new Role({
        roleName,
      permissions,
    });
    await newRole.save();
    return new Response(JSON.stringify(newRole), {
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

export const updateRole = async (req: Request) => {
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
    const { name } = await req.json();
    const role = await Role.findById(id);
    role.name = name;
    await role.save();
    return new Response(JSON.stringify(role), {
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

export const deleteRole = async (req: Request) => {
  const url = new URL(req.url);
  // console.log(req);
  const id = url.pathname.split("/").pop();
  // console.log(id);
  if (!id) {
    return new Response(JSON.stringify({ message: "Section ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  await Role.findByIdAndDelete(id);
  return new Response(JSON.stringify({}), {
    status: 200,
  });
};
