import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};
