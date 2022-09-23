import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://ravi:ravi@cluster0.cn5wq.mongodb.net/next-auth-project?retryWrites=true&w=majority"
  );

  return client;
}
