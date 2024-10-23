import jwt from "jsonwebtoken";

export const generateJwt = (admin, { expiresIn }) => {
  const token = jwt.sign(admin.toJSON(), process.env.JWT_SECRET, { expiresIn });

  return token;
};
