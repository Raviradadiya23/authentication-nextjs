import { hasedPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res
      .status(422)
      .json({ messege: "password should be grater than 7 characters" });

    client.close();
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ messege: "Email already exists" });
    client.close();
    return;
  }

  const hasePassword = await hasedPassword(password);

  db.collection("users").insertOne({
    email: email,
    password: hasePassword,
  });

  res.status(201).json({
    messege: "User Created Successfully",
  });
  client.close();
}

export default handler;
