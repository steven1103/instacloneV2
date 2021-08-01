import { createWriteStream } from "fs";
import * as bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
console.log(process.cwd());

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  try {
    let avatarUrl = null;
    if (avatar) {
      const { filename, createReadStream } = await avatar;
      const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}}`
      const readStream = createReadStream();
      const writeStream = createWriteStream(
        process.cwd() + "/uploads/" + filename
      );
      readStream.pipe(writeStream);
      avatarUrl = `http://localhost:4000/static/${newFilename}`
    }
    let uglyPassword = null;
    if (newPassword) {
      uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        firstName,
        lastName,
        username,
        email,
        bio,
        ...(uglyPassword && { password: uglyPassword }),
      },
    });
    if (updatedUser.id) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: "Could not update profile.",
      };
    }
  } catch (e) {
    console.log(e)
    return {
      ok:false,
      error:e
    }
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn) ,
  },
};
