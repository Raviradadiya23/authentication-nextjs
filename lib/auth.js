import { hash } from "bcryptjs";

export const hasedPassword = async (password) => {
  return await hash(password, 14);
};
