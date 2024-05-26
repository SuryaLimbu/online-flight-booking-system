// Adjust the path to your Role model

import connectDB from "@/lib/mongodb";
import Role from "@/models/Role";

const createDummyRoles = async () => {
  // Connect to MongoDB
  await connectDB();

  // Define dummy roles data
  const roles = [
    {
      roleName: "Admin",
      permissions: "create,read,update,delete",
    },
    {
      roleName: "User",
      permissions: "read",
    },
    {
      roleName: "Moderator",
      permissions: "read,update",
    },
    {
      roleName: "Editor",
      permissions: "create,read,update",
    },
    {
      roleName: "Guest",
      permissions: "read",
    },
  ];

  try {
    // Insert dummy roles into the database
    await Role.insertMany(roles);
    console.log("Dummy roles data inserted successfully");
  } catch (error) {
    console.error("Error inserting dummy roles data:", error);
  } finally {
    // Disconnect from MongoDB
    await (await connectDB()).connection.close();
  }
};

createDummyRoles();
