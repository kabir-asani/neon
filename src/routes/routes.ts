import { Hono } from "hono";
import { authenticationRoutes } from "./authentication-routes";
import { prismaClient } from "../extras/prisma";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";

export const allRoutes = new Hono();

allRoutes.use(async (context, next) => {
  console.log("HTTP METHOD", context.req.method);
  console.log("URL", context.req.url);
  console.log("HEADERS", context.req.header());

  await next();
});

allRoutes.route("/authentication", authenticationRoutes);

allRoutes.get(
  "/users",
  async (context, next) => {
    const token = context.req.header("token");

    if (!token) {
      return context.json(
        {
          message: "Missing Token",
        },
        401
      );
    }

    try {
      const verified = jwt.verify(token, jwtSecretKey);

      await next();
    } catch (e) {
      return context.json(
        {
          message: "Missing Token",
        },
        401
      );
    }
  },
  async (context) => {
    const users = await prismaClient.user.findMany();

    return context.json(users, 200);
  }
);

allRoutes.get("/health", (context) => {
  return context.json(
    {
      message: "All Ok",
    },
    200
  );
});
