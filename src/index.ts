import "dotenv/config";

import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY || process.exit(1);

console.log(jwtSecretKey);

const payload: jwt.JwtPayload = {
  iss: "https://purpleshorts.co.in",
  sub: "kabir-asani",
};

const token = jwt.sign(payload, jwtSecretKey, {
  algorithm: "HS256",
});

console.log("Token", token);

try {
  const decodedPayload = jwt.verify(token, jwtSecretKey);

  console.log("Decoded Payload", decodedPayload);
} catch (e) {
  console.log("Error", e);
  ("");
}
