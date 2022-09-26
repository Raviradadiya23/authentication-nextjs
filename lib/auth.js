import { compare, hash } from "bcryptjs";

export const hasedPassword = async (password) => {
  return await hash(password, 14);
};

export const verifyPassword = async (password, hasedPassword) => {
  return await compare(password, hasedPassword);
};
