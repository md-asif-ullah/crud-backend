import jwt from "jsonwebtoken";

const createJwtToken = (payload, secret, expiresTime) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresTime,
  });
};
export default createJwtToken;
