import client from "../../client";
import { protectedResolver } from "../../User/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const Photo = await client.photo.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      if (!Photo) {
        return {
          ok: false,
          error: "No Photo found",
        };
      } else if (Photo.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Unauthorized event",
        };
      } else {
        client.photo.delete({
          where: { id },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};
