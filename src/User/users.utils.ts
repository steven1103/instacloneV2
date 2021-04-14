import * as jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const verifyedToken: any = jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verifyedToken) {
      const user = await client.user.findUnique({
        where: { id: verifyedToken["id"] },
      });
      if (user) {
        return user;
      }
    }
    return null;
  } catch {
    return null;
  }
};

export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    return ourResolver(root, args, context, info);
  };
}
