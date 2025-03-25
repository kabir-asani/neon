import { Hono } from "hono";
import { prismaClient } from "../extras/prisma";
import { tokenMiddleware } from "./middlewares/token-middleware";

export const usersRoutes = new Hono();

usersRoutes.get("/me", tokenMiddleware, async (context) => {
  const userId = context.get("userId");

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user) {
    return context.json(user, 200);
  } else {
    return context.json(
      {
        message: "Missing /me User",
      },
      404
    );
  }
});

usersRoutes.get("", tokenMiddleware, async (context) => {
  const users = await prismaClient.user.findMany();

  return context.json(users, 200);
});
