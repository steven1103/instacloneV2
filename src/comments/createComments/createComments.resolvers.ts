import client from "../../client";
import { protectedResolver } from "../../User/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, text }, { loggedInUser }) => {
        const ok = await client.photo.findUnique({
          where: {
            id: photoId,
          },
          select: {
            id: true,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Photo not found",
          };
        }
        await client.comment.create({
            data: {
                text,
                photo: {
                    connect: {
                      id: photoId
                    }
                },
                user: {
                  connect: {
                    id: loggedInUser.id
                  }
                }
            }
        })
        return {
          ok: true
        }
      }
    ),
  },
};
