import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../server/db";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  await prisma.admin
    .findMany({
      include: { User: true },
    })
    .then((admins) => {
      const isAdmin = admins.some(
        (admin) => admin.User.email === session.user.email
      );
      res.status(200).json({ isAdmin });
    });

  res.status(401).json({ error: "Unauthorized" });
};

export default handler;
