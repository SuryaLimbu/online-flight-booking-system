import { login } from "@/controllers/loginController";
import connectDB from "@/lib/mongodb";

export async function POST(req: Request, res: Response) {
  await connectDB();
  return login(req);
}
