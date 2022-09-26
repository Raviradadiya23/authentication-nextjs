import { getSession } from "next-auth/react";
import { hasedPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return;
  }
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ messege: "user is not authorized" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  if (!newPassword || newPassword.trim().length < 7) {
    res
      .status(403)
      .json({ messege: "new password length must be greate than 7" });
    return;
  }

  const client = await connectToDatabase();
  const usersCollections = client.db().collection("users");

  const user = await usersCollections.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ messege: "user not found" });
    client.close();
    return;
  }
  //   console.log(user);
  const currentPassword = user.password;
  const isVerify = await verifyPassword(oldPassword, currentPassword);

  if (!isVerify) {
    res.status(403).json({ messege: "current password is wrong" });
    client.close();
    return;
  }

  const hasePassword = await hasedPassword(newPassword);

  const result = await usersCollections.updateOne(
    { email: userEmail },
    { $set: { password: hasePassword } }
  );

  client.close();
  res.status(200).json({ messege: "password updated successfully" });
}
